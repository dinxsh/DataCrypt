const express = require('express')
const router = express.Router()
const crypto = require('crypto');

router.post('/encrypt', async function (req, res) {
    const data = req.body;
    const msgBuffer = new TextEncoder().encode(data.text);
    const hashBuffer = await crypto.subtle.digest(data.type, msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    res.status(200).json({ status: 200, data: hashHex });
});

router.get('/status', function (req, res) {
    res.status(200).json({ status: "200" });
});

module.exports = router