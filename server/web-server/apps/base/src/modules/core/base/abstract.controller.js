export default class AbstractController {

    constructor(client, req = null, res = null, responseHandler = null) {
        this.request = req;
        this.res = res;
        this.response = responseHandler;
        this.CLIENT = client; 
        this.initialize();
    }

    get reqParams() {
        return this.request.params;
    }

    get reqQuery() {    
        return this.request.query;
    }

    get reqBody() {
        return this.request.body;
    }

   /*  sendResponse(resMethodName, ...methodArguments) {
        return this.response[resMethodName].apply(this.responseHandler, methodArguments);
    } */

    initialize() {
        
    }

}