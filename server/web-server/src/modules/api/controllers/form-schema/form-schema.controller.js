
import AbstractController from '@coreModule/base/abstract.controller';

export default class FormSchemaController extends AbstractController {

    initialize() {
        super.initialize();
    }

    getFormSchemaAction() {
        this.responseHandler.json(this.reqParams).end();
    }

}

export {
    FormSchemaController
};
        