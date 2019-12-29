 
const Router = SERVER.EXPRESS.Router();
module.exports = ApiRouter => {
    require('@apiModule/controllers/form-schema/form-schema.controller.routing')(Router);
    ApiRouter.use(`/api`, Router);
};