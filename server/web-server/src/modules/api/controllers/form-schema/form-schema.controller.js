
import AbstractController from '@coreModule/base/abstract.controller';
import userApiService from '@userModule/services/user-api.service';
import path from 'path';
import * as fs from 'fs';



export default class FormSchemaController extends AbstractController {

    initialize() {
        super.initialize();
    }

    getFormSchemaAction() {
        const { apiKey, eApiKey, formCode} = this.reqParams;
        userApiService.validateAPI(apiKey, eApiKey).then(isValid => {
            if (isValid) {
                const jsonFilePath = path.join('forms_schema', `${formCode}.json`);
                this.responseHandler.sendFile(jsonFilePath, true).end();
            } else {
                this.responseHandler.status(401).end('Unauthorized request.');
            }
            
        });
    }

}

export {
    FormSchemaController
};
        