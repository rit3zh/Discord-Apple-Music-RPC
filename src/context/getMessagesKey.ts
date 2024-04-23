import { Client, TextBasedChannel } from "discord.js-selfbot-v13";
import { Guild } from "../@types/GuildName";

export async function getMessagesKeysLength(client: Client) {
  const guild = client.guilds.cache.find((guild) => guild.name === Guild.Name);
  const channel = guild?.channels.cache.find(
    (channel) => channel.name === "images"
  ) as TextBasedChannel;
  return channel.messages.cache.size;
}
