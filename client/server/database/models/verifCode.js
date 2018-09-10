const mongoose = require('mongoose')
const Schema = mongoose.Schema
const md5 = require('md5')
mongoose.promise = Promise

// Define userSchema
const verifCodeSchema = new Schema({

	userId: { type: String, unique: false, required: false },
	verifCode: { type: String, unique: false, required: false },

})

// Define schema methods
verifCodeSchema.methods = {
	hashCode: plainTextCode => {
		return md5(plainTextCode)
	}
}

// Define hooks for pre-saving
verifCodeSchema.pre('save', function (next) {
	console.log('models/user.js hashPassword in pre save')
	this.password = this.hashCode(this.password)
	next()
})

const verifCode = mongoose.model('verifCode', verifCodeSchema)
module.exports = verifCode