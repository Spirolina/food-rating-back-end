import { generateKeyPair } from 'crypto'
generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'food rating'
  }
}, (err, publicKey, privateKey) => {
    console.log(publicKey)
    console.log(privateKey)
});