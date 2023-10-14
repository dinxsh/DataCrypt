const express = require('express')
const router = express.Router()
const crypto = require('crypto');

router.post('/encrypt', (req, res) => {
    const { text, key } = req.body;
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    res.json({ encryptedText: encrypted });
});

router.post('/decrypt', (req, res) => {
    const { encryptedText, key } = req.body;
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    res.json({ decryptedText: decrypted });
});

router.get('/status', function (req, res) {
    res.status(200).json({ status: "200" });
});

module.exports = router