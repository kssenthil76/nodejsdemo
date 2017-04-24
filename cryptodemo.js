var crypto = require('crypto-js');

var secretMsg = {
    name: 'Senthil',
    secretName: '007'
};

var secretKey = 'abc123';

var encyMsg = crypto.AES.encrypt(JSON.stringify(secretMsg),secretKey);
console.log('Encrypted Msg' + encyMsg);


var bytes = crypto.AES.decrypt(encyMsg,secretKey);
var decyMsg = JSON.parse(bytes.toString(crypto.enc.Utf8));

console.log('Decrypted Msg : ' + decyMsg);



