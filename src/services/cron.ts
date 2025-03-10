"use server";

import { Ai } from "./ai";
import { Db } from "./redis";

const NUM_TO_POLL = 10;

export default async function runCron() {
    const loadingEntries = await Db.getLoadingEntries(NUM_TO_POLL);
    for (const username of loadingEntries) {
        const resume = await Db.getUserResume(username);
        if (!resume) continue;
        const evaluation = await Ai.evaluateResume(resume);
        await Db.setEval(username, evaluation);
    }
}
