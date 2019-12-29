
import AbstractClass from '@coreModule/base/abstract.class';
import path from 'path';

export default class ResponseHandlerClass extends AbstractClass {

    constructor(req, res) {
        super();
        this.req = req;
		this.res = res;
    }

    initialize() {
        super.initialize(); 
	}
	
	sendDefaultResponse() {
		this.sendResponse();
	}

    _write(content, endFlag, statusCode, contentType, enCoding) {
        if (!enCoding) {
            enCoding = 'utf-8';
        }
        if (!statusCode) {
            statusCode = 200;
        }
        if (!contentType) {
            contentType = { 'Content-Type': 'text/html' };
        }
        this.res.writeHead(statusCode, contentType);
        if (endFlag) {
            this.end(content, enCoding);
        } else {
            this.write(content, enCoding);
        } 
    }

    _sendText(text, endFlag, statusCode) {
      //  this._write(text, endFlag, statusCode, { 'Content-Type': 'text/html' });
        this.status(statusCode);
		this.send(text);
    }

    _sendJson(json, endFlag, statusCode) {
	  //  this._write(json, endFlag, statusCode, { 'Content-Type': 'application/json' });
      this.status(statusCode);
	  this.json(json);
    }

    _sendFile(filePath) {
        const req = this.req;
        const url = req.url;
        if (url === '/') {
            return this.sendDefaultResponse();
        } else if(!filePath) {
            filePath = url;
        } 
        const fullFilePath = SERVER.PATHS.CLIENT_ROOT + filePath;
        this.res.sendFile(fullFilePath);
    }

   
	sendResponse(successFlag = true, data = '', message = 'Action Performed.', responseCode = '', httpStatusCode = 200, endFlag = true) {
		var data = {
			SUCCESS		: successFlag,
			DATA		: data,
			CODE		: responseCode,
			MESSAGE		: message
		};
		this.status(httpStatusCode);
		this.json(data);
		if (endFlag) {
			this.end();
		}
	}

    get app() {
		return this.res.app;
	}	

	get headersSent() {
		return this.res.headersSent;
	}	

	get locals() {
		return this.res.locals;
    }	
    
    beforeSendResponse(resMethodName, ...argsArr) {
		return true;
    }

	append() {
		return this._callResponseMethod('append', ...arguments);
	}	

	attachment() {
		return this._callResponseMethod('attachment', ...arguments);
	}	

	cookie() {
		return this._callResponseMethod('cookie', ...arguments);
	}	

	clearCookie() {
		return this._callResponseMethod('clearCookie', ...arguments);
	}	

	download() {
		return this._callResponseMethod('download', ...arguments);
	}	

	end() {
		return this._callResponseMethod('end', ...arguments);
	}	

	format() {
		return this._callResponseMethod('format', ...arguments);
	}	

	get() {
		return this._callResponseMethod('get', ...arguments);
	}	

	json() {
		return this._callResponseMethod('json', ...arguments);
	}	

	jsonp() {
		return this._callResponseMethod('jsonp', ...arguments);
	}	

	links() {
		return this._callResponseMethod('links', ...arguments);
	}	

	location() {
		return this._callResponseMethod('location', ...arguments);
	}	

	redirect() {
		return this._callResponseMethod('redirect', ...arguments);
	}	

	render() {
		return this._callResponseMethod('render', ...arguments);
	}	

	send() {
		return this._callResponseMethod('send', ...arguments);
	}	

	sendFile(filePath, isServerStaticFile, isAbsolutePath, ...restParams) {
		const req = this.req;
        const url = req.url;
        if (url === '/') {
            filePath = '/index.html';
        } else if(!filePath) {
            filePath = url;
		}
		let fullFilePath = filePath;
		if (!isAbsolutePath) {
			if (isServerStaticFile) {
				fullFilePath = path.join(SERVER.PATHS.STATIC_FILES, filePath);
			} else {
				fullFilePath = SERVER.PATHS.CLIENT_ROOT + filePath;
			} 
		}
		return this._callResponseMethod.apply(this, ['sendFile', fullFilePath, ...restParams]);
	}	

	sendStatus() {
		return this._callResponseMethod('sendStatus', ...arguments);
	}	

	set() {
		return this._callResponseMethod('set', ...arguments);
	}	

	status() {
		return this._callResponseMethod('status', ...arguments);
	}	

	type() {
		return this._callResponseMethod('type', ...arguments);
	}	

	vary() {
		return this._callResponseMethod('vary', ...arguments);
	}

	_callResponseMethod(resMethodName, ...argsArr) {
		try {
			let responseReturn = null;
			if (this.beforeSendResponse.apply(this, [resMethodName, ...argsArr])) {
				responseReturn = this.res[resMethodName](...argsArr);
			}
			this.afterResponseSuccess = this.afterSendResponse.apply(this, [resMethodName, responseReturn, ...argsArr]);
			return this;
		} catch (error) {
			SERVER.LOGGER.logError(error);
			return this;
		}
	}

	afterSendResponse(resMethodName, resSuccess, ...argsArr) {
		return true;
	}

}

export {
    ResponseHandlerClass
};
        