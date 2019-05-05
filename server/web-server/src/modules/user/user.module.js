import AbstractModule from '@coreModule/classes/abstract.module';
import AuthController from '@userModule/controllers/auth/auth.controller';

export class UserModule extends AbstractModule {
    
    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        this._controllers = {
            auth: AuthController
        };
    }
}