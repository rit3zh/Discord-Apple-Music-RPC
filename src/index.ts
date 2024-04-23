import dotenv from 'dotenv'
dotenv.config()
import { Client, RichPresence, TextBasedChannel } from 'discord.js-selfbot-v13'
import { createGuild } from './context/createGuild'
import { fetchGuild } from './context/fetchGuild'
import { createAttachment } from './context/createAttachment'
import { Guild } from './@types/GuildName'
import { createPresence } from './context/createPresence'
import { createBridge } from './core/createBridge'
import { createSong } from './core/createSong'
import { createAppleBridge } from './core/createAppleBridge'
import { Events } from './@types/Events'
import { deleteLastMessage } from './context/deleteLastMessage'
import { getMessagesKeysLength } from './context/getMessagesKey'
import type { TrackData } from 'itunes-bridge'
import ora from 'ora-classic'

class ExtendedClient extends Client {
  ACCESS_TOKEN?: string = process.env.USER_TOKEN
  applicationId?: string = process.env.APPLICATION_ID
  customPresence?: RichPresence
  currentImageURL?: string

  constructor() {
    super({ partials: ['MESSAGE'] })
  }

  start() {
    this.initialize()
    this.login(this.ACCESS_TOKEN)
  }

  initialize() {
    this.on('ready', async () => {
      this.log(`${this.user?.displayName} is now ready`)

      const guildExists = await this.fetchCoreGuild()
      if (!guildExists) {
        console.log(`❌ | Guild not found`)
        const spinner = ora('Creating guild').start()
        await createGuild(this).then(() =>
          setTimeout(() => {
            spinner.succeed('Guild created!')
            console.log('Exiting the process')
            process.exit()
          }, 4000)
        )
      } else {
        console.log('✅ | Guild found!')
        const bridge = createBridge()
        const appleEmitter = createAppleBridge()
        await createPresence(this)

        bridge.on(Events.Paused, async (type, data) => {
          return this.user?.setPresence({})
        })

        bridge.on(Events.Playing, async (type, data) => {
          appleEmitter.on(Events.TimeChange, 'music', async (initData: any) => {
            if (initData.elapsedTime < 4) return

            this.user?.setPresence({
              activities: [
                this.customPresence?.setEndTimestamp(
                  (Date.now() + initData?.remainingTime * 1000) as any
                )!
              ]
            })
          })
          if (type === 'player_state_change') {
            this.user?.setPresence({
              activities: [
                this.customPresence?.setEndTimestamp(
                  (Date.now() + data?.remainingTime! * 1000) as any
                )!
              ]
            })
          } else if (type === 'new_track') {
            console.log('New Track')
            await this.delete()
            await this.initializePresence(data!)
          } else {
            const mapKeySize = await this.keySize()

            if (mapKeySize > 0) {
              console.log('Deleted')
              await this.delete()
              await this.initializePresence(data!)
            } else {
              console.log('Initialized')
              await this.initializePresence(data!)
            }
          }
        })
      }
    })
  }
  log = (input: any, ...optional: any[]) =>
    optional.length > 0 ? console.log(input, optional) : console.log(input)
  async fetchCoreGuild() {
    return await fetchGuild(this)
  }
  public async getChannel() {
    const guild = await this.guilds.cache.find(
      (guild) => guild.name === Guild.Name
    )
    const channel = guild?.channels.cache.find(
      (channel) => channel.name === 'images'
    ) as TextBasedChannel
    return {
      channelId: channel?.id,
      guildId: guild?.id,
      channel: channel
    }
  }

  async pass(doesGuildExists: boolean) {
    if (doesGuildExists) {
      return undefined
    } else {
      return await createGuild(this)
    }
  }

  public async initializePresence(data: TrackData, isPausedButNext?: boolean) {
    const song = await createSong(data.name, data.album, data.artist)
    const metadata = await this.getChannel()
    await createAttachment(
      this,
      metadata?.guildId?.toString() as string,
      metadata?.channelId?.toString() as string,
      song.imageurl
    ).then(async (url) => {
      // setTimeout(async () => {
      this.currentImageURL = url
      this.customPresence = await createPresence(this, {
        imageurl: url as string,
        url: song.trackViewUrl as string,
        name: song.trackName as string,
        album: song.collectionName as string,
        artists: song.artistName as string,
        duration: data?.duration! * 1000,
        currentTime: new Date() as any
      })

      // }, 1000);
    })
  }

  public async delete() {
    return await deleteLastMessage(this)
  }
  public async keySize() {
    return await getMessagesKeysLength(this)
  }
}
new ExtendedClient().start()
