const express = require('express')
const crypto = require('crypto');
const router = express.Router()

router.get('/all', (req, res) => {
    res.send(['sha-256', 'sha-1', 'md5'])
})

router.get('/get/:id', (req, res) => {
    res.send(req.params)
})

router.get('/get/:id', (req, res) => {
    const user1 = crypto.createDiffieHellman(2048);
    const aliceKey = alice.generateKeys();
    const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
    const bobKey = bob.generateKeys();
    const aliceSecret = alice.computeSecret(bobKey);
    const bobSecret = bob.computeSecret(aliceKey);
    req.json({ "user1 hash": aliceSecret.toString('hex'), "user2 hash": bobSecret.toString('hex') })
})

module.exports = router