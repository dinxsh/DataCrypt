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

module.exports = router