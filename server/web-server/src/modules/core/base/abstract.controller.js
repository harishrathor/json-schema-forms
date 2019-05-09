export default class AbstractController {

    constructor(req = null, res = null, responseHandler = null) {
        this.req = req;
        this.res = res;
        this.responseHandler = responseHandler;
        this.initialize();
    }

    initialize() {}

}