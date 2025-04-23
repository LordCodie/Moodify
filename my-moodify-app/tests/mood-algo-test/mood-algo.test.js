const { askLLMForMood } = require('../mood-algo-test/jest.setup')

describe('ai and sentiment intergration', () => {

    // returns i've received from 'ai returning json data'
    const aiReturns = [
        {
            "score": -4,
            "comparative": -0.4444444444444444,
            "tokens": ["everything", "feels", "heavy", "lately", "i", "miss", "them", "so", "much"],
            "words": ["heavy", "miss"],
            "positive": [],
            "negative": ["heavy", "miss"]
        },
        {
            "score": 2,
            "comparative": 0.2222222222222222,
            "tokens": ["everything", "feels", "inspiring", "lately", "i", "am", "gradified", "so", "much"],
            "words": ["inspiring"],
            "positive": ["inspiring"],
            "negative": []
        }
    ]

    // test('ai returning json data', async () => {
    //     const userInput = 'Everything feels inspiring lately. I am gradified so much.'
    //     const res = await askLLMForMood(userInput)
    //     console.log(res)
    //     expect(res).toBeDefined()
    // }, 100000)

    
})