const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: String,
    lang: String,
    profile: {
        background: String,
        title: String,
        description: String,
        badges: Array,
        crowns: String,
        gender: String,
        birthday: {
            age: Number,
            month: Number,
            day: Number
        },
        rep: Number,
        marry: {
            marry1: String,
            marry2: String
        },
        leveling: {
            xp: Number,
            level: Number,
            background: String
        }
    }
});

module.exports = mongoose.model("User", userSchema);