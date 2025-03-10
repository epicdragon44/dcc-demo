import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import Groq from "groq-sdk";

const DISALLOWED_MODELS = [
    "distil-whisper-large-v3-en",
    "whisper-large-v3",
    "whisper-large-v3-turbo",
];

async function pickModel() {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const res = await groq.models.list();
    const models = res.data
        .map((m) => m.id)
        .filter((m) => !DISALLOWED_MODELS.includes(m));
    const randomIndex = Math.floor(Math.random() * models.length);
    return models[randomIndex];
}

async function createGroqModel() {
    return createGroq({
        apiKey: process.env.GROQ_API_KEY,
    })(await pickModel());
}

export namespace Ai {
    export async function evaluateResume(resume: string) {
        const groq = await createGroqModel();
        const { text } = await generateText({
            model: groq,
            prompt: `
              Decide whether the following resume is a good fit for the following job description.
              Please respond with a one word response of whether to accept or reject the resume: either "ACCEPT" or "REJECT".

              BEGIN JOB DESCRIPTION ===
              ${jobDescription}

              BEGIN RESUME ===
              ${resume}
            `,
        });
        return text.trim();
    }
}

const jobDescription = `
  We are looking for a highly qualified, experienced, and passionate product designer to join our mid-sized company over the summer as an intern.
`;
