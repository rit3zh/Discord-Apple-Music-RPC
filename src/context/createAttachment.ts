import {
  Client,
  MessageAttachment,
  TextBasedChannel,
} from "discord.js-selfbot-v13";

export async function createAttachment(
  client: Client,
  guildId: string,
  channelId: string,
  imageurl?: string
) {
  const file = new MessageAttachment(String(imageurl), "image.jpg");
  const guild = client.guilds.cache.get(guildId);
  const channel = (await guild?.channels.fetch(channelId)) as TextBasedChannel;

  const message = await channel.send({
    files: [file],
  });
  return message.attachments.first()?.url;
}
