// import dotenv from "dotenv";
const dotenv = require("dotenv")
const result = dotenv.config({ path: './tests/spotify-test/.env.spotify.test' })

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const LASTFM_KEY = process.env.LASTFM_KEY

// console.log({ clientId, clientSecret });

// step 1: get access token
// const getAccessToken = async () => {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: 'grant_type=client_credentials'
//     })
//     const data = await response.json()
//     return data.access_token
// }

// step 2: search for tracks
// const searchTracks = async (token, genreOrMood) => {
//     const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(genreOrMood)}&type=track&limit=20`, {
//         headers: { Authorization: `Bearer ${token}` }
//     })
//     const data = await res.json()
//     return data.tracks.items.map(track => ({
//       name: track.name,
//       artist: track.artists[0].name
//     }))
// }

// Step 3: Get MusicBrainz ID
// const getMusicBrainzID = async (trackName, artistName) => {
//     const query = encodeURIComponent(`${trackName} AND artist:${artistName}`)
//     const res = await fetch(`https://musicbrainz.org/ws/2/recording/?query=${query}`, {
//       method: 'GET',
//       headers: {
//         'User-Agent': 'MyCoolApp/1.0 (myemail@example.com)',
//          'Accept': 'application/json'
//       }
//     })
//     const data = await res.json()
//     return data.recordings?.[0]?.id || null
// }

// 4. Get AcousticBrainz features
// const getAcousticFeatures = async (mbid) => {
//     const res = await fetch(`https://acousticbrainz.org/api/v1/${mbid}/high-level`)
//     console.log(res)
//     if (!res.ok) throw new Error("AcousticBrainz failed")
//     const data = await res.json()
//     return {
//         energy: data.highlevel.energy?.value === 'high' ? 1 : 0,
//         valence: data.highlevel.valence?.value === 'positive' ? 1 : 0,
//     }
// }

// 5. Compare mood with features
// const isSimilar = async (trackFeatures, moodTarget) => {
//     return (
//         Math.abs(trackFeatures.energy - moodTarget.energy) <= 0.5 &&
//         Math.abs(trackFeatures.valence - moodTarget.valence) <= 0.5
//     )
// }

// 6. Main logic based on mood
// const recommendByMood = async (userMood) => {
//     const moodTarget = moodMap[userMood.toLowerCase()];
//   if (!moodTarget) return console.error('❌ Unknown mood.');

//   const token = await getAccessToken();
//   const searchResults = await searchTracks(token, userMood); // search using mood word itself

//   const matches = [];

//   for (const track of searchResults) {
//     try {
//       const mbid = await getMusicBrainzID(track.name, track.artist);
//       if (!mbid) continue;

//       const features = await getAcousticFeatures(mbid);
//       if (isSimilar(features, moodTarget)) {
//         matches.push({ ...track, features });
//       }
//     } catch (e) {
//       console.warn(`⚠️ Skipping ${track.name} - ${e.message}`);
//     }
//   }

//   console.log(`\n🎯 Recommendations for mood "${userMood}":`);
//   matches.forEach((t, i) =>
//     console.log(`${i + 1}. ${t.name} by ${t.artist} | Energy: ${t.features.energy}, Valence: ${t.features.valence}`)
//   )
// }

// Recommend by mood last.fm api
const lastFMRecommendByMood = async (mood, limit = 20) => {
  const url = new URL('http://ws.audioscrobbler.com/2.0/')
  url.searchParams.set('method', 'tag.gettoptracks')
  url.searchParams.set('tag', mood)
  url.searchParams.set('limit', limit)
  url.searchParams.set('api_key', LASTFM_KEY)
  url.searchParams.set('format', 'json')

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Last.fm error: ${res.statusText}`)
  const { tracks } = await res.json()

 return tracks.track.map(t => ({
  name: t.name,
  artist: t.artist.name,
  url: t.url,
  image: t.image
 }))
}

// module.exports = { getAccessToken, searchTracks, getMusicBrainzID, getAcousticFeatures, isSimilar, recommendByMood }
module.exports = { lastFMRecommendByMood }
