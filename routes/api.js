const crypto = require('crypto');
const express = require('express');
const router = express.Router();

function isValidAlgorithm(algorithm) {
    return crypto.getCiphers().includes(algorithm);
}

router.post('/encrypt', (req, res) => {
    const { text, key, algorithm, iv } = req.body;
    if (!text || !key || !algorithm || !iv) {
        return res.status(400).json({ error: 'text, key, algorithm, and iv are required' });
    }
    if (!isValidAlgorithm(algorithm)) {
        return res.status(400).json({ error: 'Invalid algorithm' });
    }
    try {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        res.json({ encryptedText: encrypted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during encryption' });
    }
});

router.post('/decrypt', (req, res) => {
    const { text, key, algorithm, iv } = req.body;
    if (!text || !key || !algorithm || !iv) {
        return res.status(400).json({ error: 'text, key, algorithm, and iv are required' });
    }
    if (!isValidAlgorithm(algorithm)) {
        return res.status(400).json({ error: 'Invalid algorithm' });
    }
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        res.json({ decryptedText: decrypted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during decryption' });
    }
});

module.exports = router;