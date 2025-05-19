import { moodifyViaLastFm } from "@/utilities/song/song-api"
import { compileMood } from "@/utilities/mood/mood-algo"

export const getSongs = async (text) => {
    try {
        const { sentimentMood, extGenre, extArtist } = await compileMood(text)
        const res = await moodifyViaLastFm({
            mood: sentimentMood,
            artistName: extArtist,
            genre: extGenre,
            _timeTag: null
        })
        if (!res || res.length === 0) throw Error('No songs returned')
        return { success: true, data: res }
    } catch (error) {
        console.log(error)
        return { success: false, message: `error returning songs from song-api: ${error}` }
    }
}