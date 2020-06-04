const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({
    guildID: String,
    channelID: String
})

module.exports = mongoose.model('Logs', logsSchema)