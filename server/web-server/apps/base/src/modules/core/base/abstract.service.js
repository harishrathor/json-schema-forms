export default class AbstractService {
    
    constructor(client) {
        this.CLIENT = client;
        this.initialize();
    }

    initialize() {
    }

}

export {
    AbstractService
};