const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    res.sendFile('home.html', { root: "./views" });
});

router.get('/about', (req, res) => {
    res.sendFile('about.html', { root: "./views" });
});

router.get('/get-started', (req, res) => {
    res.sendFile('get-started.html', { root: "./views" });
});

router.get('/updates', (req, res) => {
    res.sendFile('updates.html', { root: "./views" });
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: "./views" });
});

router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: "./views" });
});

module.exports = router