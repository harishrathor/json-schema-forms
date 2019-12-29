 
/*

Note: Please do not edit it. This file is written by server.

*/

const Router = SERVER.EXPRESS.Router();
module.exports = ApiRouter => {
    require('@coreModule/controllers/user-navigation/user-navigation.controller.routing')(Router);
    ApiRouter.use(`/core`, Router);
};