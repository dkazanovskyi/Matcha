const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const verifCodeSchema = new Schema({

	username: { type: String, unique: false, required: false },
	verifCode: { type: String, unique: false, required: false },

})

const verifCode = mongoose.model('verifCode', verifCodeSchema)
module.exports = verifCode