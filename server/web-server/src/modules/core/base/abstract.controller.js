export default class AbstractController {

    constructor(req = null, res = null, responseHandler = null) {
        this.request = req;
        this.res = res;
        this.response = responseHandler;
        this.initialize();
    }

    initialize() { }

    get reqParams() {
        return this.request.params;
    }

    get reqQuery() {    
        return this.request.query;
    }

    get reqBody() {
        return this.request.body;
    }

}