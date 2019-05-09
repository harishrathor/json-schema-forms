import AbstractModule from '@coreModule/base/abstract.module';
import AuthController from '@userModule/controllers/auth/auth.controller';

export class UserModule extends AbstractModule {

    initialize() {
        super.initialize();
        this._controllers = {
            auth: AuthController
        };
    }
}