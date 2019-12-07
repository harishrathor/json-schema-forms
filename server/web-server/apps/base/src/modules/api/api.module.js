
import AbstractModule from '@coreModule/base/abstract.module';
import { controllers } from '@apiModule/api.module.data';

export default class ApiModule extends AbstractModule {

    initialize() {
        super.initialize();
        this._controllers = controllers;
    }

}
export {
    ApiModule
};
