import AbstractController from '@coreModule/classes/abstract.controller';

export default class JsonController extends AbstractController {
    constructor() {
        super();
        this.initialize();
    }

    initialize() {
    }

    jsonAction(req, res, responseHandler) {
        responseHandler.sendResponse('text', 'JSON action.', true);
    }
}

export {JsonController};