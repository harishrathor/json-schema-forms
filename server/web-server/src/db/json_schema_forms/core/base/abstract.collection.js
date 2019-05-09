

export default class AbstractCollection {

    constructor() {
        this.initialize();
    }

    initialize() {
        this.collectionName = '';
    }

    get collection() {
        return new Promise((resolve, reject) => {
            if (!this.collectionName || !global.SERVER.DB || !global.SERVER.DB.CONNECTION ) {
                return reject(null);
            }

            global.SERVER.DB.CONNECTION.collection(this.collectionName, (err, collection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(collection);
                }
            });
            
        });
    }
}

export {
    AbstractCollection
};
