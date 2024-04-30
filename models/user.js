const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    profile: String,
    dateCreated: String,
    lastLoggedIn: String,
});

module.exports = UserSchema;