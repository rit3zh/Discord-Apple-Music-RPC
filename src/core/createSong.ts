import AppleMusic, { ItunesSearchOptions } from "node-itunes-search";

import { getResizedPicture } from "../utils/getResizedPicture";

export async function createSong(name: string, album: string, artist: string) {
  try {
    const request = await AppleMusic.search(
      new ItunesSearchOptions({ term: `${name} ${album}`, limit: 20 })
    );
    const response = request.results.filter(
      (results) =>
        results.trackName === name &&
        results.artistName === artist &&
        results.collectionName === album
    )[0];
    const image = getResizedPicture(
      response?.artworkUrl100?.toString() as string
    );
    return {
      imageurl: image,
      ...response,
    };
  } catch (error) {
    const request = await AppleMusic.search(
      new ItunesSearchOptions({ term: `${name} ${album}`, limit: 20 })
    );
    const response = request.results[0];
    const image = getResizedPicture(
      response?.artworkUrl100?.toString() as string
    );
    return {
      imageurl: image,
      ...response,
    };
  }
}
