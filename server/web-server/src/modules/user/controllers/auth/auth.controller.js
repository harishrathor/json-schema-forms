
import AbstractController from '@coreModule/base/abstract.controller';
import UserUsersCollection from '@jsonSchemaFormsDB/user/collections/users.collection';

export default class AuthController extends AbstractController {

    initialize() {
        super.initialize();
    }

    loginAction() {
        this.req.session.username = 'harishrathor';
        const userPersonInfoCollection = new UserUsersCollection();
        userPersonInfoCollection.collection.then((collection) => {
            const result = collection.insertOne({
                name: 'Harish Rathor',
              //  email: 'harishrathor@gmail.com',
                gender: 'M',
                username: 'harishrathor',
                password: 'mypassword'
            }).then((user) => {
                //console.log(user);
                collection.find().count().then((count) => {
                    this.responseHandler.sendResponse('text', 'Logged In successfully. Total insertion count: ' + count, true);
                }).catch((err) => {
                    console.log('Error in fetching count', err);
                });
            }).catch((err) => {
                console.log("Error in inserting user.", err);
            });
        }).catch((err) => {
            console.log(err);
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
        