
import AbstractClass from '@coreModule/base/abstract.class';

import utils from '@shared/utils.class'; 

export default class ResponseHandlerClass extends AbstractClass {

    constructor(req, res) {
        super();
        this.req = req;
        this.res = res;
    }

    initialize() {
        super.initialize();
    }

    _write(content, endFlag, statusCode, contentType, endCoding) {
        if (!endCoding) {
            endCoding = 'utf-8';
        }
        if (!statusCode) {
            statusCode = 200;
        }
        if (!contentType) {
            contentType = { 'Content-Type': 'text/html' };
        }
        this.res.writeHead(statusCode, contentType);
        if (endFlag) {
            this.res.end(content, endCoding);
        } else {
            this.res.write(content, endCoding);
        }
    }

    _sendText(text, endFlag, statusCode) {
        this._write(text, endFlag, statusCode, { 'Content-Type': 'text/html' });
    }

    _sendJson(json, endFlag, statusCode) {
        this._write(json, endFlag, statusCode, { 'Content-Type': 'application/json' });
    }

    _sendFile(filePath, endFlag) {
        const request = this.req;
        const url = request.url;
        if (url === '/') {
            filePath = '/index.html';
        } else if(!filePath) {
            filePath = url;
        } 
        const fullFilePath = SERVER.PATHS.CLIENT_ROOT + filePath;
        this.res.sendFile(fullFilePath);
    }

    sendResponse(resType, response, endFlag, resCode) {
        if (!resType) {
            return false;
        }
        if (!resCode) {
            resCode = 200;
        }
        if (typeof endFlag !== 'boolean' && !endFlag ) {
            endFlag = true;
        }
        const type = utils.toCamelCase(resType.toLowerCase());
        const resMethodName = `_send${type}`;
        if (!this[resMethodName]) {
            return false;
        }
        this[resMethodName](response, endFlag, resCode);
        return this;
    }

    end() {
        this.res.end();
    }

}

export {
    ResponseHandlerClass
};
        