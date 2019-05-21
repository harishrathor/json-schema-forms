
import AbstractController from '@coreModule/base/abstract.controller';
import UserUsersCollection from '@jsonSchemaFormsDB/user/collections/users.collection';

// My user name : harish_6104, Password: harishrathor

export default class AuthController extends AbstractController {

    initialize() {
        super.initialize();
    }

    loginAction() {
        const usersCollection = new UserUsersCollection();
        usersCollection
        .validateUsingUsernamePassword(this.reqParams.username, this.reqParams.password)
        .then(count => {
            if(count === 1) {
                this.req.session.username = this.reqParams.username;
                this.responseHandler.sendResponse('text', 'Logged In successfully.', true);
            } else if (count > 1) {
                this.responseHandler.sendResponse('text', 'More than one user exist.', true);
            } else {
                this.responseHandler.sendResponse('text', 'User does exists.', true);
            }
        }) 
        .catch(error => {
            SERVER.LOGGER.logError(error);
            this.responseHandler.sendResponse('text', 'Error in validating user.', true);
        }) 
        ;
      /*   const id = parseInt(Math.random() * 10000);
        const phone = parseInt(Math.random() * 10000000000);
        usersCollection.createUser({
            name: `Harish Rathor `,
            email: `harishrathor${id}@gmail.com`,
            gender: `M`,
            username: `harish_${id}`,
            password: `harishrathor`,
            phone: phone
        }).then((user) => {
            usersCollection.find().count().then((count) => {
                this.responseHandler.sendResponse('text', 'Logged In successfully. Total insertion count: ' + count, true);
                SERVER.LOGGER.logInfo('User count:', count);
            }).catch((err) => {
                SERVER.LOGGER.logInfo('Error in fetching count').logError(err);
                this.responseHandler.sendResponse('text', 'Error in counting user.');
            });
        }).catch((err) => {
            SERVER.LOGGER.logError(err);
            this.responseHandler.sendResponse('text', 'Error in creating user.');
        }); */
    }

    logoutAction() {
        this.req.session.destroy();
        this.responseHandler.sendResponse('text', 'Logged Out successfully', true);
    }

    testAction() {
        this.responseHandler.sendResponse('text', 'Test Action.');
    }

}

export {
    AuthController
};
        