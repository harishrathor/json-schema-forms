
import AbstractModule from '@coreModule/base/abstract.module';
import { controllers } from '@userModule/user.module.data';

export default class UserModule extends AbstractModule {

    initialize() {
        super.initialize();
        this._controllers = controllers;
    }

}
export {
    UserModule
};
