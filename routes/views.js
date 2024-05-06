const express = require('express')
const crypto = require('crypto');

const router = express.Router()

router.get('/', async (req, res) => {
    const user = req.session.user;
    res.render('home', { user }); 
});

router.get('/about', (req, res) => {
    const user = req.session.user;
    res.render('about', { user }); 
});

router.get('/get-started', (req, res) => {
    const user = req.session.user;
    res.render('get-started', { user }); 
});

router.get('/updates', (req, res) => {
    const user = req.session.user;
    res.render('updates', { user }); 
});

router.get('/login', (req, res) => {
    const user = req.session.user;
    res.render('login', { user }); 
});

router.get('/register', (req, res) => {
    const user = req.session.user;
    res.render('register', { user }); 
});

router.get('/docs', (req, res) => {
    const user = req.session.user;
    res.render('docs', { user }); 
});

router.get('/profile', (req, res) => {
    const user = req.session.user;
    res.render('profile', { user });
});

router.get('/examples', (req, res) => {
    const user = req.session.user;
    res.render('examples', { user });
});

router.get('/playground', (req, res) => {
    const ciphers = crypto.getCiphers();
    const user = req.session.user;
    res.render('playground', { user, ciphers:ciphers });
});

module.exports = router