// DiffieHellman technique for now.
const crypto = require('crypto');
const alice = crypto.createDiffieHellman(2048);
const aliceKey = alice.generateKeys();
const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);
console.log(aliceSecret.toString('hex'), "/n", bobSecret.toString('hex'))