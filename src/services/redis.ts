import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_URL as string,
    token: process.env.UPSTASH_TOKEN as string,
});

const ENUM = {
    LOADING: "LOADING",
    ERROR: "ERROR",
    PASS: "PASS",
    FAIL: "FAIL",
};

export namespace Db {
    /**
     * Set the resume of a user and start the evaluation process
     * @param username - The username of the user
     * @param resume - The resume of the user
     */
    export async function setUserResume(username: string, resume: string) {
        await redis.set(`resume:${username}`, resume);
        await redis.set(`eval:${username}`, ENUM.LOADING, {
            ex: 60 * 60 * 24 * 365,
        });
    }

    /**
     * Get the resume of a user
     * @param username - The username of the user
     * @returns - The resume of the user
     */
    export async function getUserResume(username: string) {
        return await redis.get<string>(`resume:${username}`);
    }

    /**
     * Set the evaluation of a user
     * @param username - The username of the user
     * @param eval - The evaluation of the user
     */
    export async function setEval(username: string, evaluation: string) {
        await redis.set(`eval:${username}`, evaluation);
    }

    /**
     * Get the evaluation of a user
     * @param username - The username of the user
     * @returns - The evaluation of the user
     */
    export async function getEval(username: string) {
        return await redis.get<string>(`eval:${username}`);
    }

    /**
     * Get the usernames of the entries that are still loading
     * @param limit - The number of entries to return
     * @returns - The usernames of the entries that are still loading
     */
    export async function getLoadingEntries(
        limit?: number
    ): Promise<Array<string>> {
        const keys = await redis.keys("eval:*");
        const loadingEntries: Array<{ username: string; ttl: number }> = [];

        for (const key of keys) {
            const value = await redis.get(key);
            if (value === ENUM.LOADING) {
                const ttl = await redis.pttl(key);
                const username = key.split(":")[1];
                loadingEntries.push({
                    username,
                    ttl,
                });
            }
        }

        loadingEntries.sort((a, b) => a.ttl - b.ttl);
        return loadingEntries.map((entry) => entry.username).slice(0, limit);
    }

    export async function getAllEntries(): Promise<
        Array<{
            username: string;
            resume: string;
            eval: string;
        }>
    > {
        let entries: Array<{
            username: string;
            resume: string;
            eval: string;
        }> = [];

        const keys = await redis.keys("resume:*");
        for (const key of keys) {
            const username = key.split(":")[1];
            const resume = await redis.get<string>(key);
            const evalStatus = await redis.get<string>(`eval:${username}`);
            entries.push({
                username,
                resume: resume || ENUM.ERROR,
                eval: evalStatus || ENUM.ERROR,
            });
        }

        return entries;
    }

    export async function deleteAllEntries() {
        const keys = await redis.keys("*");
        for (const key of keys) {
            await redis.del(key);
        }
    }
}
