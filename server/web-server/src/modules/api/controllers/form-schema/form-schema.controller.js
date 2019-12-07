
import AbstractController from '@coreModule/base/abstract.controller';
import { UserApiService } from '@userModule/services/user-api.service';
import cryptoService from '@coreModule/services/crypto.service';
import path from 'path';
import fs from 'fs';



export default class FormSchemaController extends AbstractController {

    initialize() {
        super.initialize();
        console.log('FormSchemaController', this.CLIENT);
        this.userApiService = new UserApiService(this.CLIENT);
    }

    getFormSchemaAction() {
        const { apiKey, ___jsf, formCode} = this.reqBody;
        this.userApiService.validateAPI(apiKey, ___jsf).then(secretKey => {
            if (secretKey) {
                const jsonFilePath = path.join(SERVER.paths.STATIC_FILES, 'forms_schema', apiKey, `${formCode}.json`);
                fs.readFile(jsonFilePath, 'utf8', (err, jsonStr) => {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            this.response.status(404).end();
                        } else {
                            this.response.status(500).end();
                        }
                    } else {
                        this.response.json(JSON.parse(jsonStr)).end();
                    }
                });
            } else {
                this.response.status(401).end('Unauthorized request.');
            }
            
        });
    }

    getConfigAction() {
        const { apiKey, ___jsf} = this.reqBody;
        this.userApiService.validateAPI(apiKey, ___jsf).then(secretKey => {
            if (secretKey) {
                const data = {
                    config: {
                        method: 'GET',
                        protocol: '',
                        domain: 'localhost',
                        port: '8686',
                        uri: '/api/form-schema/get-form-schema'
                    },
                    default: true
                };
                const dataStr = cryptoService.encrypt(JSON.stringify(data), secretKey);
                const responseJson = {
                    data: dataStr
                };
                this.response.json(responseJson);
            } else {
                this.response.status(401).end('Unauthorized request.');
            }
            
        });
    }

}

export {
    FormSchemaController
};
        