
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
                this.responseHandler.end('Logged In successfully.');
            } else if (count > 1) {
                this.responseHandler.end( 'More than one user exist.');
            } else {
                this.responseHandler.end('User does exists.');
            }
        }) 
        .catch(error => {
            SERVER.LOGGER.logError(error);
            this.responseHandler.end( 'Error in validating user.');
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
                this.responseHandler.end( 'Logged In successfully. Total insertion count: ' + count);
                SERVER.LOGGER.logInfo('User count:', count);
            }).catch((err) => {
                SERVER.LOGGER.logInfo('Error in fetching count').logError(err);
                this.responseHandler.end( 'Error in counting user.');
            });
        }).catch((err) => {
            SERVER.LOGGER.logError(err);
            this.responseHandler.end( 'Error in creating user.');
        }); */
    }

    logoutAction() {
        this.req.session.destroy();
        this.responseHandler.end( 'Logged Out successfully');
    }

    testAction() {
        this.responseHandler.end( 'Test Action.');
    }

}

export {
    AuthController
};
        