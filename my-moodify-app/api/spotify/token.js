import fetch from 'node-fetch'
import 'dotenv/config'

// console.log(
//     {SPOTIFY_ID: process.env.VITE_CLIENT_ID,SPOTIFY_SECRET: process.env.VITE_CLIENT_SECRET}
// )

let _token = null
let _expiresAt = 0

// let cachedToken, expiresAt = 0, inflight = null

export default async function handler(req, res) {
    if (_token && Date.now() < _expiresAt) return _token

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' +
                Buffer.from(
                    `${process.env.VITE_CLIENT_ID}:${process.env.VITE_CLIENT_SECRET}`
                ).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    })
    if (!response.ok) throw new Error(`Token error: ${response.statusText}`)
    const data = await response.json()
    _token = data.access_token
    _expiresAt = Date.now() + data.expires_in * 1000
    res.json({ access_token: _token })
}

