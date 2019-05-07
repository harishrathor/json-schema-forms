import AbstractCollection from '@jsonSchemaFormsDB/core/classes/abstract.collection';


export default class UserPersonInfoCollection extends AbstractCollection {

    constructor() {
        super();
        console.log('UserPersonInfoCollection constructor');
        this.initialize();
    }

    initialize() {
        console.log('UserPersonInfoCollection initialize');
        this.collectionName = 'jsf_user_person_info';
        console.log('this.collection', this.collection);
    }

}

export {
    UserPersonInfoCollection
};