const mongoose = require('mongoose')

const prefixSchema = mongoose.Schema({
    guildID: String,
    prefix: {
        default: '>',
        type: String
    }
})

module.exports = mongoose.model('Prefix', prefixSchema)