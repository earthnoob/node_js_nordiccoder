const rsa = require('node-rsa');

module.exports = (function (NodeRSA = rsa) {
  let key = new NodeRSA();
  let isInit = false;

  /* Generate public/private key pair */
  const init = () => {
    key.generateKeyPair(2048);
    isInit = true;
  }

  /* Export private key */
  const exportPrivateKey = () => {
    if (!isInit) {
      init();
    }
    return key.exportKey("pkcs1-private-pem");
  };
  /* Export public key */
   const exportPublicKey = () => {
    if (!isInit) {
      init();
    }
    return key.exportKey("pkcs1-public-pem");
  };

  return { init, exportPrivateKey, exportPublicKey };
});