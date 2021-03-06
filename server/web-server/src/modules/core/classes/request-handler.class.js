import AbstractClass from '@coreModule/base/abstract.class';
import * as path from 'path';
import utils from '@shared/utils.class'; 
import ResponseHandlerClass from '@coreModule/classes/response-handler.class';
import isAuthorizedUser from '@userModule/functions/auth.function';
import fs from 'fs';

let _this;

const validUnauthorizedAPIEndPointsArr = ['/api/user/auth/login', '/api/api/form-schema/get-config', '/api/api/form-schema/get-form-schema', '/api/user/auth/test', '/api/user/auth/context'];

export class RequestHandlerClass extends AbstractClass {

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
        let errMessage = 'Request not supported.';
        if (!this._modules[moduleName]) {
            const modulePath = path.join(SERVER.PATHS.MODULES, moduleName, moduleName + '.module.js');
            fs.exists(modulePath, (err) => {
                if (err) {
                    responseHandler.end(err.message);
                } else {
                    const fileModule = require(modulePath);
                    const moduleClassName = utils.toCamelCase(moduleName, '-') + 'Module';

                    let moduleClass = fileModule[moduleClassName];
                    if (moduleClass) {
                        moduleInstance = new moduleClass();
                        this._modules[moduleName] = moduleInstance;
                    } else {
                        errMessage = 'Module does not exist.';
                        responseHandler.end(errMessage);
                        return;
                    }
                }
            });
        } else {
            moduleInstance = this._modules[moduleName];
        }
        if (moduleInstance) {
            const controllerInstance = moduleInstance.getControllerInstance(controllerName);
            if (!controllerInstance) {
                errMessage = 'Controller could not be instantiated.';
                responseHandler.end(errMessage);
                return ;
            }
            controllerInstance.request = req;
            controllerInstance.res = res;
            controllerInstance.responseHanlder = responseHandler;
            const actionMethodName = utils.toMethodName(action, '-') + 'Action';
            if (!controllerInstance[actionMethodName]) {
                errMessage = 'Request handler is not defined.';
                responseHandler.end(errMessage);
                return ;
            }
            controllerInstance[actionMethodName](req, res, responseHandler);
        } else {
            errMessage = 'Module could not be intanstiated.';
            responseHandler.end(errMessage);
            return;
        }
    }

    _handleRequest(req, res, responseHandler) {
        try {
            const handlerInfo = this._getHandlerInfo(req);
            if (!handlerInfo.module || !handlerInfo.controller || !handlerInfo.action) {
                responseHandler.end('Invalid URL.');
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
        this._handleRequest(req, res, responseHandler);
    }

    _POSTHandler(req, res, responseHandler) {
        this._handleRequest(req, res, responseHandler);
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

    _isAccessibleUnauthorizedAPI(url) {
        let valid = false;
        validUnauthorizedAPIEndPointsArr.forEach(endPoint => {
            if (url.indexOf(endPoint) > -1) {
                valid = true;
            }
        });
        return valid;
    }

    handlerOld(req, res) {
        try {   
            const url = req.url;
            const urlParts = url.split('/').splice(1);
            const routeIdentifier = urlParts[0];
            const responseHandler = new ResponseHandlerClass(req, res);

           // let subdomainsArr = req.subdomains;
           

            if (url === '/') {
                responseHandler.sendDefaultResponse(); 
            } else {
                const userAuthorized = isAuthorizedUser(req, res);
                if (_this._isValidAuthorizedFilePath(urlParts)) {
                    if (userAuthorized) {
                        const filePath = url.substr(5)
                        responseHandler.sendFile(filePath).end();
                    } else {
                        responseHandler.status(401).end('Unauthorized file access.');
                    }
                } else if (routeIdentifier === 'api' && url.length > 5 && (userAuthorized || _this._isAccessibleUnauthorizedAPI(url) )) {
                    const methodName = req.method;
                    const handlerMethod = `_${methodName}Handler`;
                    if (!_this[handlerMethod]) {
                        responseHandler.end(`Currently ${methodName} request is not supported.`);
                    } else {
                        _this[handlerMethod](req, res, responseHandler);
                    }
                } else if(routeIdentifier === 'api' || routeIdentifier === 'assets') {
                    responseHandler.status(401).end('Unauthorized request..');
                } else {
                    let filePath = '';
                    if (_this._isValidFilePath(urlParts) || _this._isValidFileName(urlParts[urlParts.length - 1])) {
                        filePath = url;
                    }
                    responseHandler.sendFile(filePath).end();   
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    apiRequestHandler(ControllerClass, actionPath, req, res) {
        const responseHandler = new ResponseHandlerClass(req, res);
        const controllerInstance = new ControllerClass(req, res, responseHandler);
        const actionMethodName = utils.toMethodName(actionPath, '-') + 'Action';
        controllerInstance[actionMethodName]();
    }

    defaultHandler(req, res) {
        const responseHandler = new ResponseHandlerClass(req, res);
        responseHandler.sendDefaultResponse(); 
    }

    assetsHandler(req, res) {
        const url = req.url;
        const responseHandler = new ResponseHandlerClass(req, res);

        const urlParts = url.split('/');
        if (_this._isValidAuthorizedFilePath(urlParts)) {
            if (isAuthorizedUser(req, res)) {
                const filePath = url.substr('/assets', '');
                responseHandler.sendFile(filePath).end();
            } else {
                responseHandler.status(401).end('Unauthorized file access.');
            }
        } else {
            let filePath = '';
            if (_this._isValidFilePath(urlParts) || _this._isValidFileName(urlParts[urlParts.length - 1])) {
                filePath = url;
            }
            responseHandler.sendFile(filePath).end();   
        }
    }

    serverStaticFilesHandler(req, res) {
        const url = req.url;
        const responseHandler = new ResponseHandlerClass(req, res);

        const urlParts = url.split('/');
        if (true || _this._isValidAuthorizedFilePath(urlParts)) {
            if (true || isAuthorizedUser(req, res)) {
                const filePath = url.replace('/static_files', '');
                responseHandler.sendFile(filePath, true).end();
            } else {
                responseHandler.status(401).end('Unauthorized file access.');
            }
        }
    }

    //Other than APIs requests handler.
    requestHandeler(req, res, next) {
        const url = req.url;
        const responseHandler = new ResponseHandlerClass(req, res);

        if (url === '/') {
            return responseHandler.sendDefaultResponse(); 
        }

        const urlParts = url.split('/');
        if (_this._isValidAuthorizedFilePath(urlParts)) {
            if (isAuthorizedUser(req, res)) {
                const filePath = url.substr(5);
                responseHandler.sendFile(filePath).end();
            } else {
                responseHandler.status(401).end('Unauthorized file access.');
            }
        } else {
            let filePath = '';
            if (_this._isValidFilePath(urlParts) || _this._isValidFileName(urlParts[urlParts.length - 1])) {
                filePath = url;
            }
            responseHandler.sendFile(filePath).end();   
        }
        
       // next();
    }

}


const Handler = new RequestHandlerClass();
export default Handler;
