const { askLLMForMood, getMoodFromText, detectGenre, extractArtists, parseRecommendationLog, detectBias } = require('../mood-algo-test/jest.setup')

describe('# ai and sentiment intergration', () => {

    // returns i've received from 'ai returning json data'
    // const aiReturns = [
    //     {
    //         "score": -4,
    //         "comparative": -0.4444444444444444,
    //         "tokens": ["everything", "feels", "heavy", "lately", "i", "miss", "them", "so", "much"],
    //         "words": ["heavy", "miss"],
    //         "positive": [],
    //         "negative": ["heavy", "miss"]
    //     },
    //     {
    //         "score": 2,
    //         "comparative": 0.2222222222222222,
    //         "tokens": ["everything", "feels", "inspiring", "lately", "i", "am", "gradified", "so", "much"],
    //         "words": ["inspiring"],
    //         "positive": ["inspiring"],
    //         "negative": []
    //     }
    // ]

    // test('ai returning json data', async () => {
    //     const userInput = 'I am not quite sure suprise me'
    //     const res = await askLLMForMood(userInput)
    //     console.log(res)
    //     expect(res).toBeDefined()
    // }, 100000)

    describe('## testing each prompt type according to input word', () => {
        let userInput 

        // test('test system prompt', async() => {
        //     userInput = 'I feel like dancing'
        //     const res = await askLLMForMood(userInput)
        //     console.log(res)
        //     expect(res).toBeDefined()
        // }, 100000)

        // test('test genre prompt', async() => {
        //     userInput = 'give me some deep house' 
        //     const res = await askLLMForMood(userInput)
        //     console.log(res)
        //     expect(res).toBeDefined()
        //  }, 100000)

        // test('test artist prompt', async() => {
        //     userInput = 'give me some Kendrick Lamar' 
        //     const res = await askLLMForMood(userInput)
        //     console.log(res)
        //     expect(res).toBeDefined()
        // }, 100000)

        // test('if they work well together', async() => {
        //     userInput = 'I feel like dancing give me some afro house by Black Coffee' 
        //     const res = await askLLMForMood(userInput)
        //     console.log(res)
        //     expect(res).toBeDefined()
        // }, 100000)

        // test('test if llm is correctly parsed', async() => {
        //     const rawLog = `
        //         **sentiment analysis:**
        //         \`\`\`json
        //         {"score":2,"comparative":0.13333,"tokens":[...],"words":["dancing"],"positive":["dancing"],"negative":[]}
        //         \`\`\`

        //         **genre classification:**
        //         edm

        //         **artist extraction:**
        //         \`\`\`json
        //         {"artists":["black coffee"]}
        //         \`\`\`
        //     `

        //     userInput = 'I feel like dancing give me some afro house by Black Coffee'
        //     const llm = await askLLMForMood(userInput)
        //     const res = parseRecommendationLog(llm)
        //     console.log(res)
        //     expect(res).toBeDefined()
        // }, 100000) 
        
    }, 100000)

    // test('sentiment.js returning json data', async() => {
    //     const userInput = 'Everything feels inspiring lately. I am gradified so much.'
    //     const res = await getMoodFromText(userInput)
    //     console.log(res)
    //     expect(res).toBeDefined()
    // })    
})

describe('testing text extraction form user input', () => {
    // test('detec the genre input', async() => {
    //         const text = 'I want to listen to gospel or folk music'
    //         const res = detectGenre(text)
    //         console.log(res)
    //         expect(res).toBeDefined()
    //     })

    // test('extract the artist name from the input text', async() => {
    //     const text = `I like listening to 'Drake'`
    //     const res = extractArtists(text)
    //     console.log(res[0]) 
    //     expect(res).not.toEqual([])
    // })

})