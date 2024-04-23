import { Client } from "discord.js-selfbot-v13";
import { Guild } from "../@types/GuildName";

export async function fetchGuild(client: Client) {
  const guild = await client.guilds.cache.find(
    (key) => key.name === Guild.Name
  );
  if (guild) {
    return true;
  } else {
    return false;
  }
}
