const express = require('express')

const router = express.Router()

router.get('/', async(req, res) => {
    const data = await fetch("http://localhost:8000/types/all").then(res=>res.json())
    res.render('home', {algorithms: data});
});

router.get('/about', (req, res) => {
    res.render('about', req.query);
});

router.get('/get-started', (req, res) => {
    res.render('get-started', req.query);
});

module.exports = router