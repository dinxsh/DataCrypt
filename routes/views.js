const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home', req.query);
});

router.get('/about', (req, res) => {
    res.render('about', req.query);
});

module.exports = router