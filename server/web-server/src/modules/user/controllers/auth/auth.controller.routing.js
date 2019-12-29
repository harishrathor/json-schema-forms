import AuthController from '@userModule/controllers/auth/auth.controller';

const Router = SERVER.EXPRESS.Router();

Router
.route('/login/:username/:password')
.get(SERVER.API_REQUEST_HANDLER.bind(SERVER.REQUEST_HANDLER, AuthController, `login`));

Router
.route('/logout')
.get(SERVER.API_REQUEST_HANDLER.bind(SERVER.REQUEST_HANDLER, AuthController, `logout`));

Router
.route('/test')
.get(SERVER.API_REQUEST_HANDLER.bind(SERVER.REQUEST_HANDLER, AuthController, `test`));

Router
.route('/context')
.get(SERVER.API_REQUEST_HANDLER.bind(SERVER.REQUEST_HANDLER, AuthController, `context`));
        
module.exports = ModuleRouter => {
    ModuleRouter.use(`/auth`, Router);
};
        