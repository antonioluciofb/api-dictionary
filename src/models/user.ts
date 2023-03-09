import mongoose from 'mongoose'

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        id: String,
        name: String,
        email: String,
        password: String,
        wordsHistory: Array({
            word: String,
            createdAt: Date,
        }),
        favoritesWords: Array({
            word: String,
            createdAt: Date,
        }),
    })
)

export default User
