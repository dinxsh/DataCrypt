const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/get-started', (req, res) => {
    res.render('get-started');
});

router.get('/updates', (req, res) => {
    res.render('updates');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/docs', (req, res) => {
    res.render('docs');
});

router.get('/examples', (req, res) => {
    res.render('examples');
});

module.exports = router