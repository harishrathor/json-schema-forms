
export default class AbstractModule {

    constructor(client) {
        this.CLIENT = client;
        this.initialize();
    }
    
    initialize() {
        this.config = {};
    }

    getControllerClass(controllerName) {
        return this.controllers[controllerName];
    }

    getControllerInstance(controllerName) {
        const controllerClass = this.getControllerClass(controllerName);
        if (!controllerClass) {
            return null;
        }
        return new controllerClass(this.CLIENT);
    }

    get controllers() {
        return this._controllers;
    }
}
