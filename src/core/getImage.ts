import { config } from "../configuration/Config";
import { Spotify } from "spotify-info.js";
const spotify = new Spotify({
  clientID: config.spotifyClientID,
  clientSecret: config.spotifyClientSecret,
});
export const getImage = async (query: string): Promise<string> => {
  const track = await spotify.searchTrack(query.toString());
  return track[0].album.images[0].url;
};
