const aesjs = require("aes-js");
const { encryptKey } = require("../config/app").auth

exports.encrypt = function (text) {
    var textBytes = aesjs.utils.utf8.toBytes(text);
    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(encryptKey, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
};

exports.decrypt = function (text) {
    var encryptedBytes = aesjs.utils.hex.toBytes(text);
    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(encryptKey, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
}