
import AbstractCollection from '@jsonSchemaFormsDB/core/base/abstract.collection';

export default class ApiUsersCollection extends AbstractCollection {

    initialize() {
        super.initialize();
        this.collectionName = 'jsf_api_api_users';
    }

}

export {
    ApiUsersCollection
};
        