import { redisClient } from '..'

export const createStringRedis = (
    limit: number,
    page: number,
    searchTerm?: string
) => {
    return `limit=${limit}&page=${page}&search=${searchTerm}`
}

export const redisSetListFormatter = (
    objectToSave: Object,
    key: string,
) => {
    const redisList = JSON.stringify(objectToSave)

    redisClient.set(key, redisList)
}
