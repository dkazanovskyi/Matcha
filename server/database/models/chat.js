var mongoose = require('mongoose');


var chatSchema = mongoose.Schema({
    sender    : String,
    recipient : String,
    message   : String
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Chat', chatSchema);