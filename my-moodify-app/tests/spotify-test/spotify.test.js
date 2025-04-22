const { getAccessToken, searchTracks, getMusicBrainzID, getAcousticFeatures, isSimilar, recommendByMood } = require('../spotify-test/jest.setup') 

describe('spotify api response [intergration] test', () => {

    // will expire within an hour (18:18)
    const tempToken = "BQC01UBwQ5dYaghnK4iF2h8rDOHqnIO05RZHUV_NSbBmIw8lRIe30oQ7_iO0y1_c4vwEl-5fCewN30r7puvg2gqaAJ3UgN2J0SVVxC7PMTopLgzyfkh9hZUlgvCHf_KLLwT1YYu_zng"

    // test('check access token number of characters', async () => {
    //     const res = await getAccessToken()
    //     console.log(res)
    //     expect(res).toHaveLength(139)
    // })

    // test('search for tracks', async () => {
    //     const res = await searchTracks(tempToken, 'Kendrick Lamar')
    //     // console.log(res)
    //     expect(res).toBeDefined()
    // })
})