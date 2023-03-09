import fetch from 'cross-fetch'

const freeDictionaryAPIConsult = async (word: string) => {
    try {
        const result = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        )

        const findedWord = await result.json()

        if (findedWord.title)
            throw new Error('Nenhum resultado encontrado para essa palavra')
        else {
            return findedWord[0]
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export default freeDictionaryAPIConsult
