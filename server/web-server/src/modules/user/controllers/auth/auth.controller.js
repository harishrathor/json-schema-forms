
import AbstractController from '@coreModule/base/abstract.controller';
import UserUsersCollection from '@jsonSchemaFormsDB/user/collections/users.collection';

export default class AuthController extends AbstractController {

    initialize() {
        super.initialize();
    }

    loginAction() {
        this.req.session.username = 'harishrathor';
        const userPersonInfoCollection = new UserUsersCollection();
        userPersonInfoCollection.insert({
            name: 'Harish Rathor',
          //  email: 'harishrathor@gmail.com',
            gender: 'M',
            username: 'harishrathor',
            password: 'mypassword'
        }).then((user) => {
            userPersonInfoCollection.find().count().then((count) => {
                this.responseHandler.sendResponse('text', 'Logged In successfully. Total insertion count: ' + count, true);
                SERVER.LOGGER.logInfo('User count:', count);
            }).catch((err) => {
                SERVER.LOGGER.logInfo('Error in fetching count').logError(err);
            });
        }).catch((err) => {
            SERVER.LOGGER.logError(err);
        });
    }

    logoutAction() {
        this.req.session.destroy();
        this.responseHandler.sendResponse('text', 'Logged Out successfully', true);
    }

}

export {
    AuthController
};
        