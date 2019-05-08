import AbstractCollection from '@jsonSchemaFormsDB/core/classes/abstract.collection';


export default class UserPersonInfoCollection extends AbstractCollection {

    initialize() {
        super.initialize();
        this.collectionName = 'jsf_user_person_info';
    }

}

export {
    UserPersonInfoCollection
};