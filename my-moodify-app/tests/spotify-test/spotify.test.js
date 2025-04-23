const { getAccessToken, searchTracks, getMusicBrainzID, getAcousticFeatures, isSimilar, recommendByMood, lastFMRecommendByMood } = require('../spotify-test/jest.setup') 

describe('lastFM api response [intergration] test', () => {

    // will expire within an hour (14:30)
    // const tempToken = "BQAfttDiglqIaEsyzt2mVauaGfzGmcsO-ADUAr7R-NpdZ4BqcZEXUsW5t7et5ncc3oTJ8WNkP17Aw4709OLlRVFF1-PtLV24gRI6MhnJgpoZMEpy8w9zHV0dwviFnlV6LUTetxJwyrE"

    // test('check access token number of characters', async () => {
    //     const res = await getAccessToken()
    //     console.log(res)
    //     expect(res).toHaveLength(139)
    // })

    // test('search for tracks', async () => {
    //     const res = await searchTracks(tempToken, 'Kendrick Lamar')
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })

    // test('get music brainz ID', async () => {
    //     const res = await getMusicBrainzID('Not Like Us', 'Kendrick Lamar')
    //     console.log(res)
    //     expect(res).not.toBeNull() 
    // })

    // test('get AcouticBrainz features', async () => {
    //     // Kendrick Lamar - 'Not Like Us' (id)
    //     const mbid = '88f628b8-5564-4c70-9a07-8a66d14bf7be'
    //     const res = await getAcousticFeatures(mbid)
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })

    test('get recommendations from lastFM', async() => {
        const res = await lastFMRecommendByMood('Happy', 1)
        console.log(res)
        expect(res).toBeDefined()
    })
})