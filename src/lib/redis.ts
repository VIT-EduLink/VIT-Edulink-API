import { Redis } from "ioredis";

const getRedistUrl = () => {
    if(process.env.REDIS_URL) {
        return process.env.REDIS_URL
    }
    throw new Error('REDIS_URL is not defined')
}

export const redis = new Redis(getRedistUrl())