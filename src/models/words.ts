import mongoose from 'mongoose'

const Words = mongoose.model(
    'Words',
    new mongoose.Schema({
        list: String,
        createdAt: Date,
        updatedAt: Date,
    })
)

export default Words
