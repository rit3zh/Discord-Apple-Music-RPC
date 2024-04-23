import { Client } from "discord.js-selfbot-v13";
import { Guild } from "../@types/GuildName";

export async function createGuild(client: Client) {
  const guild = await client?.guilds.create(Guild.Name);
  const channel = await guild.channels.create("Images", { type: "GUILD_TEXT" });
  const invite = channel.createInvite({
    maxAge: 0, // 0 = infinite expiration
    maxUses: 0, // 0 = infinite uses
  });
  return (await invite).url;
}
