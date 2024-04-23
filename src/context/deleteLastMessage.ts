import { Client, TextBasedChannel } from "discord.js-selfbot-v13";
import { Guild } from "../@types/GuildName";

export async function deleteLastMessage(client: Client) {
  try {
    const guild = client.guilds.cache.find(
      (guild) => guild.name === Guild.Name
    );
    const channel = guild?.channels.cache.find(
      (channel) => channel.name === "images"
    ) as TextBasedChannel;
    const guildBasedTextChannel = await channel;
    const messages = await guildBasedTextChannel.messages.fetch({
      limit: 2,
    });
    const lastMessage = messages.last();
    const _id = lastMessage?.id;
    const cacheMessage = guildBasedTextChannel?.messages.cache.get(
      _id as string
    );
    return await cacheMessage?.delete();
  } catch (error: any | void | Error | undefined | null) {
    console.log(
      "There is an error deleting in the last message of the text channel ```<images>``` "
    );
  }
}
