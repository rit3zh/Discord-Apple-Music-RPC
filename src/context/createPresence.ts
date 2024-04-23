import { RichPresence, Client } from "discord.js-selfbot-v13";
import { Util } from "discord.js-selfbot-rpc";
import { APPLICATION_ID } from "../constants/APPLICATION_ID";
interface Data {
  name: string;
  album: string;
  artists: string;
  imageurl: string;
  url: string;
  duration: number;
  currentTime?: number;
}

export async function createPresence(client?: Client, data?: Data) {
  const initialAppleBigImage = await Util.getAssets(
    APPLICATION_ID,
    "better_apple"
  );
  const initialAppleSmallImage = await Util.getAssets(
    APPLICATION_ID,
    "apple_small_icon"
  );

  if (client?.user?.presence?.activities?.length! > 0) {
    client?.user?.setPresence({ activities: [] });
    const presence = new RichPresence()
      .setApplicationId(APPLICATION_ID)

      .setType("LISTENING")
      .setURL("https://www.youtube.com/watch?v=eIdvwA0zvr4")
      // .setState(`${data?.name}`)
      .setDetails(`${data?.name}`)
      .setName("Apple Music")
      .setState(`by ${data?.artists}`)
      .setStartTimestamp(data?.currentTime as any)
      .setEndTimestamp((Date.now() + data?.duration!) as any)
      .setAssetsLargeImage(`${data?.imageurl}`)
      .setAssetsLargeText(`on ${data?.album}`)
      .setAssetsSmallImage(initialAppleSmallImage.id)
      .setAssetsSmallText("Streaming")
      .addButton("Listen on Apple Music", data?.url!);
    client?.user?.setActivity(presence as any);
    client?.user?.setPresence({ status: "dnd" });
    return presence;
  } else {
    const presence = new RichPresence()
      .setApplicationId(APPLICATION_ID)
      .setType("STREAMING")
      .setStartTimestamp(Date.now() as any)
      .setEndTimestamp()
      .setURL("https://www.youtube.com/watch?v=eIdvwA0zvr4")
      .setState("Browsing...")
      .setName("Apple Music")
      .setDetails(`Apple Music `)
      .setStartTimestamp(new Date())
      .setAssetsLargeImage(initialAppleBigImage.id)
      .setAssetsLargeText("Apple Music")
      .setAssetsSmallImage(initialAppleSmallImage.id)
      .setAssetsSmallText("Streaming")
      .addButton("Listen", "https://youtube.com");

    client?.user?.setActivity(presence as any);
    client?.user?.setPresence({ status: "dnd" });
    return presence;
  }
}
