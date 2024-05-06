const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const UserSchema = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const saltRounds = 10;
const uri = process.env.mongodb_uri;

mongoose.connect(uri, {
}).then(() => {
    console.log("Successfully connected to db");
}).catch(error => {
    console.error('Error connecting to db', error);
});

const User = mongoose.model('User', UserSchema);

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, profile } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, email, password: hashedPassword, profile});
        await user.save();
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            profile: user.profile
        };
        console.log(req.session.user)
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error registering user' + error);
    }
});

router.post('/login', async (req, res) => {    
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid username or password');
    }
    req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
    };
    res.redirect('/');
});

module.exports = router