const express = require('express')
const mongoose = require('mongoose')
const UserSchema = require('../models/user');
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();
const uri = process.env.mongodb_uri;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to db");
}).catch(error => {
    console.error('Error connecting to db', error);
});

const User = mongoose.model('User', UserSchema);

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, email, password: hashedPassword});
        await user.save();
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email
        };
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {    
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid username or password');
    }
    res.redirect('/');
});

module.exports = router