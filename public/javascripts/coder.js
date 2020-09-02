// Based on https://nodejs.org/api/crypto.html

const md5 = require('md5');
const crypto = require('crypto');

function hexStringToByteArray (str) {
    const result = new Int8Array(str.length / 2);
    for (i = 0; i <= (str.length - 1) / 2; i++) {
        result[i] = parseInt(str.substring(i * 2, i * 2 + 2), 16);
    }

    return result;    
}

module.exports.createMD5Key = function createMD5Key(password) {
    return hexStringToByteArray(md5(password).slice(0,32));
}

module.exports.createSaltedKey = function createSaltedKey(password, salt, iterations, length) {
    return crypto.pbkdf2Sync(password, salt, iterations, length / 8, 'sha' + length);
}

module.exports.createStdIV = function createStdIV() {
    return Buffer.alloc(16).fill(0);
}

module.exports.encrypt = function encrypt(keyByte, iv, str) {
    const cipherEncrypter = crypto.createCipheriv("aes-" + (keyByte.length * 8) + "-cbc", keyByte, iv);
    var myEncStr = cipherEncrypter.update(str, 'utf8', 'base64');
    myEncStr += cipherEncrypter.final('base64');
    return myEncStr;
}

module.exports.decrypt = function decrypt(keyByte, iv, str) {
    const cipherDecrypter = crypto.createDecipheriv("aes-" + (keyByte.length * 8) + "-cbc", keyByte, iv);
    var myDecStr = cipherDecrypter.update(str, 'base64', 'utf8');
    myDecStr += cipherDecrypter.final('utf8');
    return myDecStr;
}
