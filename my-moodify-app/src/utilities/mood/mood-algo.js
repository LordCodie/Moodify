import Sentiment from "sentiment"

const sentiment = new Sentiment()

const openRouterApi = import.meta.env.VITE_OPEN_ROUTER_API

// console.log({openRouterApi: openRouterApi})

// <-------------------- Sentiment Score ------------------------------->
function mapSentimentToMood(score) {
  if (score > 4) return 'happy';
  if (score > 0) return 'chill';
  if (score < -4) return 'heartbreak';
  if (score < 0) return 'sad';
  return null; // fallback needed
}
// <-------------------- Sentiment Score ------------------------------->

// <-------------------- Sentiment.js ------------------------------->
const getMoodFromText = async (userText) => {
  // 1) Quick local pass
  let analysis = sentiment.analyze(userText)
  console.log(`🧠 Sentiment.js scored: ${analysis.score}`)

  // 2) If ambiguous, ask the LLM to "be" sentiment.js
  // if (mapSentimentToMood(analysis.score) === null){
  //   console.log(`🤔 Sentiment unclear — falling back to LLM-emulated Sentiment.js…`)
  //   analysis = await askLLMForMood(userText)
  //   console.log(`💬 LLM-emulated score: ${analysis.score}`)
  // }

  // 3) Map that final score into your mood buckets
  const mood = mapSentimentToMood(analysis.score)
  console.log(`🎯 Final mood: ${mood}`)
  return mood
}
// <-------------------- Sentiment.js ------------------------------->

// <-------------------- Additional Parameters ------------------------------->
const genreKeywords = {
  rock: ['guitar', 'drums', 'mosh', 'riff', 'distortion', 'amp', 'solo'],
  hiphop: ['beats', 'flow', 'rhyme', 'hip hop', 'rap', 'MC', 'scratch'],
  edm: ['drop', 'rave', 'bass', 'beatdrop', 'synth', 'EDM', 'club'],
  jazz: ['sax', 'improv', 'swing', 'jazz', 'trumpet', 'bebop', 'blue note'],
  pop: ['chorus', 'hook', 'radio', 'dance', 'catchy', 'pop'],
  classical: ['symphony', 'orchestra', 'concerto', 'piano', 'mosart', 'beethoven', 'strings'],
  country: ['banjo', 'cowboy', 'twang', 'honky', 'boots', 'country', 'fiddle'],
  reggae: ['dub', 'skank', 'kingston', 'roots', 'Jamaica', 'one drop'],
  metal: ['riff', 'thrash', 'headbang', 'growl', 'metal', 'moshpit'],
  blues: ['blues', '12-bar', 'shuffle', 'slide', 'harmonica', 'soulful'],
  folk: ['acoustic', 'storytelling', 'folk', 'banjo', 'campfire', 'traditional'],
  rnb: ['groove', 'soul', 'melisma', 'R&B', 'smooth', 'slow jam'],
  punk: ['DIY', 'mohawk', 'anarchy', 'punk', 'mosh', 'garage'],
  disco: ['mirrorball', 'funk', 'dancefloor', 'disco', 'Saturday night', 'boogie'],
  latin: ['salsa', 'reggaeton', 'bachata', 'tango', 'cumbia', 'Latin'],
  kpop: ['idol', 'K-pop', 'bias', 'dance practice', 'comeback', 'fan chant'],
  metalcore: ['breakdown', 'scream', 'metalcore', 'double kick', 'riff'],
  ska: ['ska', 'skank', 'upstroke', 'two tone', 'brass section'],
  gospel: ['gospel', 'choir', 'amen', 'worship', 'hymn', 'spirit'],
}

const detectGenre = (text) => {
  const lc = text.toLowerCase()
  for (const [genre, words] of Object.entries(genreKeywords)) {
    if (words.some(w => lc.includes(w))) return genre
  }
  return null
}

const extractArtists = (text) => {
  const regex = /["']([^']+)["']/g
  const artists = []
  let match;

  while ((match = regex.exec(text)) !== null) {
    artists.push(match[1].trim())
  }

  return artists
}
// <-------------------- Additional Parameters ------------------------------->

// <-------------------- LLM ------------------------------->
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

  const genrePrompt = `
    You’re a music-genre classifier.  
    Choose exactly one genre from ["rock","hiphop","edm","jazz","pop","classical","country","reggae",…].
    Respond with only the genre name—no JSON, no explanation.
    Text: """${userText}"""
  `

  const artistPrompt = `
    You are a music-artist extractor.
    Given the user’s freeform text, identify at least one favorite artist.
    • If the user explicitly names artists, list all of them.
    • If none are named, infer one artist that best matches their vibe or genre preference.
      
    Respond with **only** a JSON object with this shape:
    {
      "artists": ["Artist Name", …]
    }

    No extra text or keys—just the JSON.
      
    Text: """${userText}"""
  `

  const userPrompt = `Analyze: """${userText}"""`

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openRouterApi}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "microsoft/mai-ds-r1:free",
      "messages": [
        { role: 'system', content: systemPrompt.trim() },
        { role: 'system', content: genrePrompt.trim() },
        { role: 'system', content: artistPrompt.trim() },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.0
    })
  })

  const data = await res.json()
  const reply = data.choices?.[0]?.message?.content?.toLowerCase().trim()
  return reply
}

const parseRecommendationLog = (logText) => {
  // Normalize line breaks and trim
  const lines = logText
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  let sentimentJson, artistJson, genre;

  // Case A: fenced JSON blocks
  const fences = [...logText.matchAll(/```json\s*([\s\S]*?)```/g)].map(m => m[1].trim());
  if (fences.length >= 2) {
    sentimentJson = fences[0].replace(/\[\s*\.\.\.\s*\]/g, '[]').replace(/\.{3}/g, '');
    artistJson    = fences[1];
    // try to pull genre with the same regex
    const genreMatch = logText.match(/\*\*genre classification:\*\*\s*([^\s]+)/i);
    genre = genreMatch ? genreMatch[1] : null;
  } else {
    // Case B: inline JSON + plain genre line
    // Expecting:
    //   line0 = {"score":...}
    //   line1 = hiphop       <-- genre
    //   line2 = {"artists":[...]}
    if (lines.length < 3) {
      throw new Error('Log must have at least 3 non-empty lines (sentiment JSON, genre, artist JSON).');
    }
    sentimentJson = lines[0];
    genre         = lines[1];
    artistJson    = lines[2];
  }

  // Parse!
  let score, artists;
  try {
    score   = JSON.parse(sentimentJson);
    ({ artists } = JSON.parse(artistJson));
  } catch (err) {
    throw new Error(`Invalid JSON detected: ${err.message}`);
  }

  return { score, artists, genre };
};

// <-------------------- LLM ------------------------------->

export const compileMood = async (text = '') => {
  let sentimentMood, llm

  // 1.1 Sentiment
  sentimentMood = await getMoodFromText(text)

  // 1.2 LLM Extratcion 
  if (sentimentMood === null) {
    console.log(`🤔 Sentiment unclear — falling back to LLM-emulated Sentiment.js…`)
    llm = await askLLMForMood(text)
    // console.log(`llm return: ${llm}`)
    // sentimentMood = parseRecommendationLog(llm)
    // console.log(`💬 LLM-emulated score: ${JSON.stringify(sentimentMood, null, 2)}`)
    const {
      score: { score: numericScore, comparative },
      artists,
      genre
    } = parseRecommendationLog(llm)
    sentimentMood = mapSentimentToMood(numericScore)
    console.log('Numeric score:', numericScore)
    // console.log('Comparative score:', comparative)
    // console.log('Artists:', artists)
    // console.log('Genre:', genre)
  }

  // 2. Extracted Genre 
  const extGenre = detectGenre(text)

  // 3. Extracted Artist
  const extArtist = extractArtists(text)

  return {
    sentimentMood,
    extGenre,
    extArtist
  }
}

// Expected output:
// 1. Score (including map)
// 2. Artist
// 3. Genre
