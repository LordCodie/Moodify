const Sentiment = require('sentiment')
const dotenv = require("dotenv")

const sentiment = Sentiment()
const result = dotenv.config({ path: './tests/mood-algo-test/.env.mood-algo-test.test' })

const openRouterApi = process.env.OPEN_ROUTER_API;

console.log({ openRouterApi })

function mapSentimentToMood(score) {
  if (score > 4) return 'happy';
  if (score > 0) return 'chill';
  if (score < -4) return 'heartbreak';
  if (score < 0) return 'sad';
  return null; // fallback needed
}

const askLLMForMood = async (userText) => {
  const systemPrompt = `
    You are a drop-in replacement for the JavaScript library Sentiment.js.
      Given the user text, respond with a single JSON object containing exactly these keys:
        • score       (integer (ranging from 3 to -3))
        • comparative (float)  
        • tokens      (array of all words/token strings)  
        • words       (array of words found in AFINN list)  
        • positive    (array of positive words)  
        • negative    (array of negative words)  

      Do not include any other keys or extra text—just raw JSON.
  `
  const userPrompt = `Analyze: ${userText}`

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openRouterApi}` ,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "microsoft/mai-ds-r1:free",
      "messages": [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }        
      ],
      temperature: 0.0
    })
  })

  const data = await res.json()
  const reply = data.choices?.[0]?.message?.content?.toLowerCase().trim()
  return reply
}


module.exports = { askLLMForMood }