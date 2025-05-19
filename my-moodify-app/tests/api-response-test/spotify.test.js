const { getMoodTracks, moodifyViaLastFm } = require('./jest.setup')

describe('spotify DB api response [intergration] test', () => {

    // test('spotify returns', async () => {
    //     const res = await getAccessToken()
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })

    // test('test query builder',() => {
    //     // mood, artist, genre, timeTag
    //     const res = buildQuery(
    //         {
    //             mood: "Happy", 
    //             artist: "Beyonce", 
    //             genre: "r&b", 
    //             timeTag: "afternoon"
    //         }
    //     )
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })

    // test('Get a “mood” playlist via Last.fm tags', async () => {
    //     const res = await getMoodTracks("sad")
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })

    // test('elegate both mood and genre filtering to Spotify', async () => {
    //     const res = await moodifyViaLastFm({
    //         mood: "sad",
    //         artist: null,
    //         genre: null,
    //         timeTag: null
    //     })
    //     // console.log(res)
    //     expect(res).not.toEqual([])
    //     expect(res).toBeDefined()
    // }, 100000)
})