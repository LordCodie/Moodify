// import dotenv from "dotenv";
import dotenv from "dotenv" 
dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

console.log({ clientId, clientSecret });

// step 1: get access token
const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    })
    const data = await response.json()
    return data.access_token
}

// step 2: search for tracks
const searchTracks = async (token, query = 'Drake') => {
    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    console.log(data.tracks.items)
    return data.tracks.items
}

// step 3: get audio features of those tracks
const getAudioFeatures = async (token, trackIds) => {
    const ids = trackIds.join(',')
    const res = await fetch(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    return data.audio_features
}

// step 4: recommend tracks based on similar features
const recommendTracks = async (tracks, baseTrack) => {
    return tracks.filter(track =>
        Math.abs(track.energy - baseTrack.energy) < 0.1 &&
        Math.abs(track.valence - baseTrack.valence) < 0.1
    )
}

// step 5: run the full flow 
const main = async () => {
    const token = await getAccessToken()
    const seedTracks = await searchTracks(token, 'Kendrick Lamar')
    // const trackIds = seedTracks.map(track => track.id)
    // const audioFeatures = await getAudioFeatures(token, trackIds)

    // const base = audioFeatures[0]
    // const recommendations = recommendTracks(audioFeatures, base)
    
    // console.log('\n Seed Track:', seedTracks[0].name)
    // console.log('Recommendations:')
    // recommendations.forEach((rec, i) => {
    //     const track = seedTracks.find(track => track.id === rec.id)
    //     if (track) {
    //         console.log(`${i + 1}. ${track.name} by ${track.artists[0].name}`)
    //     }
    // })
}

main().catch(console.error)