function vignerFunc(plaintext) {
    return plaintext + "edited"
}
function playfairFunc(plaintext) {
    return plaintext + "edited"
}

module.exports = {
    playfair: playfairFunc,
    vigner: vignerFunc
};