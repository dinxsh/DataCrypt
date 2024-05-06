const express = require('express')
const router = express.Router()
const crypto = require('crypto');

router.post('/encrypt', (req, res) => {
    const { text, key, algorithm } = req.body;
    if (!text || !key || !algorithm) {
        return res.status(400).json({ error: 'text, key, and algorithm are required' });
    }
    try {
        const cipher = crypto.createCipher(algorithm, key);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        console.log({
            encryptedText: encrypted,
            timestamp: new Date(),
            keyUsed: key,
        });
        res.json({ 
            encryptedText: encrypted,
            timestamp: new Date(),
            keyUsed: key,
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.post('/decrypt', (req, res) => {
    const { text, key, algorithm } = req.body;
    if (!text || !key || !algorithm) {
        return res.status(400).json({ error: 'text, key, and algorithm are required' });
    }
    try {
        const decipher = crypto.createDecipher(algorithm, key);
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        res.json({ 
            decryptedText: decrypted,
            timestamp: new Date(),
            keyUsed: key,
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/status', function (req, res) {
    res.status(200).json({ status: "200" });
});

module.exports = router