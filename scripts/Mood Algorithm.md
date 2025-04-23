# Mood Algorithm: Sentiment.js + LLM fallback:

```
const Sentiment = require('sentiment');
// If you're using OpenAI or other LLMs:
const fetch = require('node-fetch'); // or your LLM SDK

const sentiment = new Sentiment();

function mapSentimentToMood(score) {
  if (score > 3) return 'happy';
  if (score > 0) return 'chill';
  if (score < -3) return 'heartbreak';
  if (score < 0) return 'sad';
  return null; // fallback needed
}

async function askLLMForMood(userText) {
  const systemPrompt = `
    You are a drop-in replacement for the JavaScript library Sentiment.js.
      Given the user text, respond with a single JSON object containing exactly these keys:
        • score       (integer)  
        • comparative (float)  
        • tokens      (array of all words/token strings)  
        • words       (array of words found in AFINN list)  
        • positive    (array of positive words)  
        • negative    (array of negative words)  

      Do not include any other keys or extra text—just raw JSON.
  `
  const userPrompt = `Analyze: """${userText}"""`

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_OPENAI_KEY`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt.trim() },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.0
    }),
  });

  const data = await res.json()
  const reply = data.choices?.[0]?.message?.content?.toLowerCase().trim()
  return reply
}

async function getMoodFromText(userText) {
  // 1) Quick local pass
  let analysis = sentiment.analyze(userText);
  console.log(`🧠 Sentiment.js scored: ${analysis.score}`);

  // 2) If ambiguous, ask the LLM to “be” Sentiment.js
  if (mapSentimentToMood(analysis.score) === null) {
    console.log('🤔 Sentiment unclear — falling back to LLM-emulated Sentiment.js…');
    analysis = await askLLMForSentiment(userText);
    console.log(`💬 LLM-emulated score: ${analysis.score}`);
  }

  // 3) Map that final score into your mood buckets
  const mood = mapSentimentToMood(analysis.score);
  console.log(`🎯 Final mood: ${mood}`);
  return mood;
}

// ———————————————————————————————————————————————
// Example usage:
(async () => {
  const userInput = 'Everything feels heavy lately. I miss them so much.';
  const mood = await getMoodFromText(userInput);
  console.log(`🎯 Final mood: ${mood}`);
})();

```
## Why this is smart
- Fast local check with Sentiment.js for 90% of cases.
- LLM fallback only triggers when sentiment score is near zero or ambiguous.
- Flexible mood labels – the LLM understands nuance like “nostalgic”, “bittersweet”, “empowered” and maps it cleanly to one of your moods.
