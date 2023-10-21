const express = require('express')
const crypto = require('crypto');
const router = express.Router()

router.get('/all', (req, res) => {
    let algos = [
        { algoName: "sha-256", description: "SHA-256 stands for Secure Hash Algorithm 256-bit and it's used for cryptographic security" },
        { algoName: "sha-1", description: "SHA-1 is a cryptographic hash function that produces a 160-bit (20-byte) hash value and is commonly used in security applications and protocols." },
        { algoName: "md5", description: "MD5, which stands for Message Digest Algorithm 5, is a widely used cryptographic hash function that produces a 128-bit (16-byte) hash value and is commonly used for data integrity checks." }
      ];
    res.send(algos)
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