
import AbstractCollection from '@jsonSchemaFormsDB/core/base/abstract.collection';

export default class UserApiCollection extends AbstractCollection {

    initialize() {
        super.initialize();
        this.collectionName = 'jsf_api_user_api';
        this.postInit();
    }

}

export {
    UserApiCollection
};
        