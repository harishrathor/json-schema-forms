 

const Router = SERVER.EXPRESS.Router();
module.exports = ApiRouter => {
    require('@userModule/controllers/auth/auth.controller.routing')(Router);
    ApiRouter.use(`/user`, Router);
};