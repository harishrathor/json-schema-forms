
import AbstractClass from '@coreModule/base/abstract.class';

import * as path from 'path';
import utils from '@shared/utils.class'; 
import ResponseHandlerClass from '@coreModule/classes/response-handler.class';
import isAuthorizedUser from '@userModule/functions/auth.function';
import fs from 'fs';

let _this;

class RequestHandlerClass extends AbstractClass {

    initialize() {
        super.initialize();
        _this = this;
        this._modules = {};
    }

    _getHandlerInfo(req) {
        let url = req.url.substr(4, (req.url.length - 1));
        const urlArr = url.split('/');
        return {
            module      : urlArr[1],
            controller  : urlArr[2],
            action      : urlArr[3]
        };
    }

    _callActionMethod(req, res, responseHandler, moduleName, controllerName, action) {
        let moduleInstance = null;
        const errMessage = 'Request not supported.';
        if (!this._modules[moduleName]) {
            const modulePath = path.join(SERVER.PATHS.MODULES, moduleName, moduleName + '.module.js');
            if (!fs.existsSync(modulePath)) {
                responseHandler.sendResponse('text', '1:' + errMessage);
                return;
            }
            const fileModule = require(modulePath);
            const moduleClassName = utils.toCamelCase(moduleName, '-') + 'Module';

            let moduleClass = fileModule[moduleClassName];
            if (moduleClass) {
                moduleInstance = new moduleClass;
                this._modules[moduleName] = moduleInstance;
            } else {
                responseHandler.sendResponse('text', '2:' + errMessage);
                return;
            }
        } else {
            moduleInstance = this._modules[moduleName];
        }

        if (moduleInstance) {
            const controllerInstance = moduleInstance.getControllerInstance(controllerName);
            controllerInstance.req = req;
            controllerInstance.res = res;
            controllerInstance.responseHandler = responseHandler;
            console.log('controllerName', controllerName);
            if (!controllerInstance) {
                responseHandler.sendResponse('text', '3:' + errMessage);
                return ;
            }
            
            const actionMethodName = utils.toMethodName(action, '-') + 'Action';
            if (!controllerInstance[actionMethodName]) {
                responseHandler.sendResponse('text', errMessage);
                return ;
            }
            controllerInstance[actionMethodName](req, res, responseHandler);
        } else {
            responseHandler.sendResponse('text',   '4:' + errMessage);
            return;
        }
    }

    handler(req, res, responseHandler) {
        try {
            const handlerInfo = this._getHandlerInfo(req);
            if (!handlerInfo.module || !handlerInfo.controller || !handlerInfo.action) {
                responseHandler.sendResponse('text', 'Invalid URL.', true);
                return;
            }
            const moduleName = handlerInfo.module;
            const controllerName = handlerInfo.controller;
            const action = handlerInfo.action;
            this._callActionMethod(req, res, responseHandler, moduleName, controllerName, action);
        } catch (error) {
            console.log(error);
        }

    }

    _GETHandler(req, res, responseHandler) {
        this.handler(req, res, responseHandler);
    }

    _POSTHandler(req, res, responseHandler) {
        this.handler(req, res, responseHandler);
    }

    _isValidAuthorizedFilePath(filePathParts) {
        return (this._isValidFilePath(filePathParts) && filePathParts[1] !== 'private');
    }

    _isValidFileName(fileName) {
        const fileNameParts = fileName.split('.');
        return fileNameParts.length > 1;
    }

    _isValidFilePath(filePathParts) {
        return (filePathParts[0] === 'assets' && this._isValidFileName(filePathParts[filePathParts.length - 1]));
    }

    handle(req, res) {
        try {   
            const url = req.url;
            const urlParts = url.split('/').splice(1);
            const routeIdentifier = urlParts[0];
            const responseHandler = new ResponseHandlerClass(req, res);

            if (url === '/') {
                responseHandler.sendResponse('file', undefined, true);
            } else {
                const userAuthorized = isAuthorizedUser(req, res);
                if (_this._isValidAuthorizedFilePath(urlParts)) {
                    if (userAuthorized) {
                        const filePath = url.substr(5)
                        responseHandler.sendResponse('file', filePath, true);
                    } else {
                        responseHandler.sendResponse('text', 'Unauthorized file access.', true, 401);
                    }

                } else if (routeIdentifier === 'api' && url.length > 5 && (userAuthorized || (!userAuthorized && url.indexOf('/api/user/auth/login') === 0))){

                    var methodName = req.method;
                    var handlerMethod = `_${methodName}Handler`;

                    if (!_this[handlerMethod]) {
                        responseHandler.sendResponse('text', `Currently ${methodName} request is not supported.`, true);
                    } else {
                    
                        _this[handlerMethod](req, res, responseHandler);

                    }

                } else if(routeIdentifier === 'api' || routeIdentifier === 'assets') {
                    responseHandler.sendResponse('text', 'Unauthorized request..', true, 401);

                } else {
                    let filePath = '/index.html';
                    if (_this._isValidFilePath(urlParts) || _this._isValidFileName(urlParts[urlParts.length - 1])) {
                        filePath = url;
                    }
                    responseHandler.sendResponse('file', filePath, true);   
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }

}


const Handler = new RequestHandlerClass();
export default Handler;

export {
    RequestHandlerClass
};
        