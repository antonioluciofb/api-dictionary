// import words from '../words.txt'

import fs from 'fs'
import path from 'path'

export const getStaticList = () => {
    try {
        return {
            list: fs
                .readFileSync(path.join(__dirname, '../words.txt'), 'utf8')
                .replaceAll('\n', '&'),
        }
    } catch (error) {
        return undefined
    }
}
