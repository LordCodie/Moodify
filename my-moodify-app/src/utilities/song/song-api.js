import { Buffer } from 'buffer'
import { nanoid } from 'nanoid';
import { env } from 'process';

const clientId = import.meta.env.VITE_CLIENT_ID
const clientSecret = import.meta.env.VITE_CLIENT_SECRET
const LASTFM_KEY = import.meta.env.VITE_LASTFM_KEY;

// console.log({ clientId, clientSecret });

// Sort out key
// console.info({LASTFM_KEY: LASTFM_KEY})

let _token = null
let _expiresAt = 0

const LASTFM_URL = 'http://ws.audioscrobbler.com/2.0/'
const BASE = 'https://api.spotify.com/v1/search'

// step 1: Get spotify access token
// const getAccessToken = async () => {
//   if (_token && Date.now() < _expiresAt) return _token

//   const response = await fetch('/spotify/api/token', {
//     method: 'POST',
//     headers: {
//       'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({ grant_type: 'client_credentials' })
//   })
//   if (!response.ok) throw new Error(`Token error: ${response.statusText}`)
//   const data = await response.json()
//   _token = data.access_token
//   _expiresAt = Date.now() + data.expires_in * 1000
//   return _token
// }

async function getToken() {
  const res = await fetch('/api/spotify/token', { 
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const { access_token } = await res.json()
  return access_token
}

const buildQuery = ({ mood, artist, genre, timeTag }) => {
  const parts = []
  if (mood) parts.push(mood)
  if (artist) parts.push(`artist:"${artist}"`)
  if (genre) parts.push(`genre:"${genre}"`)
  if (timeTag) parts.push(timeTag)
  return parts.join(' ')
}

// step 3: Intialize spotify db func.
const searchTracks = async (opts, limit = 25) => {
  const token = await getToken()
  const q = encodeURIComponent(buildQuery(opts))
  const url = `${BASE}?q=${q}&type=track&limit=${limit}`

  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) throw new Error(`Search error: ${res.statusText}`)
  const { tracks } = await res.json()
  return tracks.items.map(t => ({
    id: nanoid(),
    name: t.name,
    artist: t.artists.map(a => a.name).join(', '),
    album: t.album.name,
    url: t.external_urls.spotify,
    image: t.album.images[0]?.url
  }))
}

// step 4: Fetch top tracks for a given tag (e.g. 'happy', 'chill')
const getMoodTracks = async (tag, limit = 50) => {
  const params = new URLSearchParams({
    method: 'tag.getTopTracks',
    tag,
    api_key: LASTFM_KEY,
    format: 'json',
    limit: limit.toString()
  })
  const res = await fetch(`${LASTFM_URL}?${params}`)
  if (!res.ok) throw new Error(`Last.fm error: ${res.statusText}`)
  const { tracks } = await res.json()
  return tracks.track.map(t => ({
    name: t.name,
    artist: t.artist.name
  }))
}

// step 6: Narrow by artist and/or genre
export const moodifyViaLastFm = async ({ mood, artistName, genre, _timeTag }, limit = 25) => {
  let pool
  pool = await getMoodTracks(mood, limit * 3)

  function getRandomSubset(pool, limit = 30) {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }
  const topN = getRandomSubset(pool)

  // console.log("topN:", topN)

  const searches = await Promise.all(
    topN.map(({ artist, name }) => {
      // console.log("artist:", artist)
      // console.log("name:", name)
      return searchTracks({
        mood: null,
        artist: artist,
        genre: genre,
        timeTag: null
      });
    })
  );

  // console.log("searches:", searches)
  return searches.flat()
}


