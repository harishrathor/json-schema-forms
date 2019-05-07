import AbstractController from '@coreModule/classes/abstract.controller';
import UserPersonInfoCollection from '@jsonSchemaFormsDB/user/collections/user-person-info.collection'

export default class AuthController extends AbstractController {
    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        
    }

    loginAction(req, res, responseHandler) {
        req.session.username = 'harishrathor';
       // console.log('UserPersonInfoCollection', UserPersonInfoCollection);
         const userPersonInfoCollection = new UserPersonInfoCollection();
         userPersonInfoCollection.collection.then((collection) => {
            collection.insertOne({
                firstName: 'Harish',
                lastName: 'Rathor'
            });
            collection.find().count().then((count) => {
                responseHandler.sendResponse('text', 'Logged In successfully. Total insertion count: ' + count, true);
            }).catch((err) => {
                console.log('Error in fetching count', err);
            });
         }).catch((err) => {
             console.log(err);
         });
    }

    logoutAction(req, res, responseHandler) {
        req.session.destroy();
        responseHandler.sendResponse('text', 'Logged Out successfully', true);
    }
    
}

export { AuthController };