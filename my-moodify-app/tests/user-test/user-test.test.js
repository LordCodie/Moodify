const { lookupIPGeo, getUserTimeZone, getTimeBucket, addToIndex, readIndex } = require('../user-test/jest.setup')

describe('browser functions tests', () => {
    // test('return browser geo location', async() => {
    //     const res = await lookupIPGeo()
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })

    // test('get timezone string', () => {
    //     const res = getUserTimeZone()
    //     console.log(res)
    //     expect(res).toEqual(expect.any(String))
    // })

    // test('return browser current time', () => {
    //     const res = getTimeBucket(timezone = getUserTimeZone())
    //     console.log(res)
    //     expect(res).toEqual(expect.any(String))
    // })

    describe('add and read from indexeddb', () => {

        // test('add to indexeddb', async() => {
        //     const res = await addToIndex('Drake', 'Hip-hop')
        //     console.log(res)
        //     expect(res).toBeDefined()            
        // })

        // test('read from indexeddb', async() => {
        //     await addToIndex('Drake', 'Hip-hop')
        //     await addToIndex('SZA', 'R&B')
        //     const res = await readIndex()
        //     console.log(res)
        //     expect(res).not.toEqual([])
        //     expect(res).toBeDefined()              
        // })
    })

})