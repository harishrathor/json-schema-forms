
import AbstractModule from '@coreModule/classes/abstract.module';

export default class ApiModule extends AbstractModule {

    initialize() {
        super.initialize();
        this._controllers = {};
    }

}
export {
    ApiModule
};
