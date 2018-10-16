const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const imagesSchema = new Schema({

	username: { type: String, unique: false, required: false },
	avatar: { type: String, unique: false, required: true },
	photos: { type: Array, unique: false, required: false }
})

const Images = mongoose.model('User', imagesSchema)
module.exports = Images