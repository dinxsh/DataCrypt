const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.render('home', { user: undefined });
    }
});

router.get('/about', (req, res) => {
    if (req.session.user) {
        res.render('about', { user: req.session.user });
    } else {
        res.render('about');
    }
});

router.get('/get-started', (req, res) => {
    if (req.session.user) {
        res.render('get-started', { user: req.session.user });
    } else {
        res.render('get-started');
    }
});

router.get('/updates', (req, res) => {
    if (req.session.user) {
        res.render('updates', { user: req.session.user });
    } else {
        res.render('updates');
    }});

router.get('/login', (req, res) => {
    const user = req.session.user;
    res.render('login', { user }); 
});

router.get('/register', (req, res) => {
    const user = req.session.user;
    res.render('register', { user }); 
});

router.get('/docs', (req, res) => {
    if (req.session.user) {
        res.render('docs', { user: req.session.user });
    } else {
        res.render('docs');
    }});

router.get('/examples', (req, res) => {
    if (req.session.user) {
        res.render('examples', { user: req.session.user });
    } else {
        res.render('examples');
    }
});

module.exports = router