
import AbstractService from '@coreModule/base/abstract.service';
import CryptoJS from 'crypto-js';

export default class CryptoService extends AbstractService {

    initialize() {
        super.initialize();
        this.cryptoJS = CryptoJS;
        this._secretKey = '__eEdS7oY1ECqsEaXgNpNR__';
        /*  this._secretKey = '__';
        this._plainText = null;
        this._cipherText = null;
        this._encryptedPlainText = null; */
    }

    /* get encryptedPlainText() {
        return this._encryptedPlainText;
    } */

    encrypt(plainText, secretKey = null) {
        if (!secretKey) {
            secretKey = this.secretKey;
        }
        var ciphertext = this.cryptoJS.AES.encrypt(plainText, secretKey);
        return ciphertext.toString();
    }

    decrypt(ecryptedText, secretKey = null) {
        if (!secretKey) {
            secretKey = this.secretKey;
        }
        var bytes = this.cryptoJS.AES.decrypt(ecryptedText, secretKey);
        var plaintext = bytes.toString(this.cryptoJS.enc.Utf8);
        return plaintext;
    }
    
    getMD5Hash(plainText) {
        return this.cryptoJS.MD5(plainText).toString(this.cryptoJS.enc.Base64);
    }

    getSHA1Hash(plainText) {
        return this.cryptoJS.SHA1(plainText).toString(this.cryptoJS.enc.Base64);
    }

     get secretKey() {
        return this._secretKey;
    }

 /*   set secretKey(key) {
        this._secretKey = key;
    }

    get plainText() {
        return this._plainText;
    }

    set plainText(data) {
        this._plainText = data;
    }

    get cipherText() {
        return this._cipherText;
    }

    set cipherText(text) {
        this._cipherText = text;
    } */

}

export {
    CryptoService
};
        