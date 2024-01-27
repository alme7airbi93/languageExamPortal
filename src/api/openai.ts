import OpenAI from "openai";

const openaiApiKey = import.meta.env.VITE_OPENAI_KEY;

if (!openaiApiKey) {
  console.error('OPENAI_API_KEY is not set.');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
});

export default openai;