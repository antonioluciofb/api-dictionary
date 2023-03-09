import { createStringRedis, redisSetListFormatter } from './redisListFormatter'

export const minPage = 1
export const minLimit = 15

const createPagination = (
    wordsArray: Array<any>,
    limit = 15,
    page = 1,
    searchTerm?: string
) => {
    limit =
        Number.isNaN(limit) || limit <= 0 ? minLimit : limit > 100 ? 100 : limit

    const totalDocs = wordsArray.length
    const totalPages = Math.ceil(wordsArray.length / limit)

    page =
        Number.isNaN(page) || page <= 0
            ? minPage
            : page > totalPages
            ? totalPages
            : page

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const paginatedWords = wordsArray.slice(startIndex, endIndex)

    const paginationObjectDetails = {
        totalDocs,
        totalPages,
        results: paginatedWords,
        page,
        hasPrev: page > 1,
        hasNext: page < totalPages,
    }

    const redisKey = createStringRedis(limit, page, searchTerm)

    redisSetListFormatter(paginationObjectDetails, redisKey)

    return paginationObjectDetails
}

export default createPagination
