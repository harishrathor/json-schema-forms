

export default class AbstractCollection {

    constructor() {
        console.log('AbstractCollection constructor');
        this.initialize();
    }

    initialize() {
        console.log('AbstractCollection initialize');
        this.collectionName = '';
    }

    get collection() {
        return new Promise((resolve, reject) => {
            console.log('this.collectionName', this.collectionName);
            if (!this.collectionName || !global.SERVER.DB || !global.SERVER.DB.CONNECTION ) {
                return reject();
            }
            console.log('Getting collection');
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
