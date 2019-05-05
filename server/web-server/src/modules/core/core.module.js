import AbstractModule from '@coreModule/classes/abstract.module';
import JsonController from '@coreModule/controllers/json/json.controller';

export class CoreModule extends AbstractModule {
    
    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        this._controllers = {
            json: JsonController
        };
    }
}