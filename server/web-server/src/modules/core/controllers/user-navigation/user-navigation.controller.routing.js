
import UserNavigationController from '@coreModule/controllers/user-navigation/user-navigation.controller';

const UserNavigationRouter = SERVER.EXPRESS.Router();

UserNavigationRouter
.route('/get-user-menu-data')
.get(SERVER.API_REQUEST_HANDLER.bind(SERVER.REQUEST_HANDLER, UserNavigationController, `get-user-menu-data`));
        
module.exports = ModuleRouter => {
    ModuleRouter.use(`/user-navigation`, UserNavigationRouter);
};