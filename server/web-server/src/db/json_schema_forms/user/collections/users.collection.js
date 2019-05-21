import AbstractCollection from '@jsonSchemaFormsDB/core/base/abstract.collection';


export default class UserUsersCollection extends AbstractCollection {

    initialize() {
        super.initialize();
        this.collectionName = 'jsf_user_users';
        this.postInit();
    }

}

export {
    UserUsersCollection
};