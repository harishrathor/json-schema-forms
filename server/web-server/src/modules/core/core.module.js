
import AbstractModule from '@coreModule/base/abstract.module';
import { controllers } from '@coreModule/core.module.data';

export default class CoreModule extends AbstractModule {

    initialize() {
        super.initialize();
        this._controllers = controllers;
    }

}

export class CoreModuleV2 extends CoreModule {

}
