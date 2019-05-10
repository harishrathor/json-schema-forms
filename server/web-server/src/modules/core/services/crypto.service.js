
import AbstractService from '@coreModule/base/abstract.service';
import CryptoJS from 'crypto-js';

export default class CryptoService extends AbstractService {

    initialize() {
        super.initialize();
        this.cryptoJS = CryptoJS;
        this._secretKey = null;
        this._plainText = null;
        this._cipherText = null;
        this._encryptedPlainText = null;
    }

    get encryptedPlainText() {
        return this._encryptedPlainText;
    }

    encrypt() {
        var ciphertext = this.cryptoJS.AES.encrypt(this.plainText, this.secretKey);
        this.cipherText = ciphertext;
        this._encryptedPlainText = ciphertext.toString();
        return this._encryptedPlainText;
    }

    decrypt() {
        var bytes = this.cryptoJS.AES.decrypt(this.cipherText.toString(), this.secretKey);
        var plaintext = bytes.toString(this.cryptoJS.enc.Utf8);
        return plaintext;
    }

    get secretKey() {
        return this._secretKey;
    }

    set secretKey(key) {
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
    }

}

export {
    CryptoService
};
        