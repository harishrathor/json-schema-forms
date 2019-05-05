
export default class AbstractModule {

    constructor() {
        this.config = {};
        this.initialize();
    }

    initialize() {
        
    }

    getControllerClass(controllerName) {
        return this.controllers[controllerName];
    }

    getControllerInstance(controllerName) {
        const controllerClass = this.getControllerClass(controllerName);
        if (!controllerClass) {
            return null;
        }
        return new controllerClass;
    }

    get controllers() {
        return this._controllers;
    }
}
