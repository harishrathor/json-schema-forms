
import AbstractModule from '@coreModule/base/abstract.module';

export default class ApiModule extends AbstractModule {

    initialize() {
        super.initialize();
        this._controllers = {};
    }

}
export {
    ApiModule
};
