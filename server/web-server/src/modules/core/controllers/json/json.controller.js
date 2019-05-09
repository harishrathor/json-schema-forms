import AbstractController from '@coreModule/base/abstract.controller';

export default class JsonController extends AbstractController {
    constructor() {
        super();
        this.initialize();
    }

    initialize() {
    }

    jsonAction() {
        this.responseHandler.sendResponse('text', 'JSON action.', true);
    }
}

export {JsonController};