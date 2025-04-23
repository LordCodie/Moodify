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

export default lastFMRecommendByMood