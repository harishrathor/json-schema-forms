export default class AbstractController {

    constructor(req = null, res = null, responseHandler = null) {
        this.req = req;
        this.res = res;
        this.responseHandler = responseHandler;
        this.initialize();
    }

    get reqParams() {
        return this.req.params;
    }

    get reqQuery() {    
        return this.req.query;
    }

    get reqBody() {
        return this.req.body;
    }

   /*  sendResponse(resMethodName, ...methodArguments) {
        return this.responseHandler[resMethodName].apply(this.responseHandler, methodArguments);
    } */

    initialize() {}

}