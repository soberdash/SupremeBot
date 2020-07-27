const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildID: String,
    lang: String,
    prefix: String,
    logs: String
});

module.exports = mongoose.model("Guild", guildSchema);