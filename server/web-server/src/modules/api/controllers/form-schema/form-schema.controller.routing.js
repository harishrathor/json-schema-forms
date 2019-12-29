import FormSchemaController from '@apiModule/controllers/form-schema/form-schema.controller';

const Router = SERVER.EXPRESS.Router();

Router
.route('/get-config')
.post(SERVER.API_REQUEST_HANDLER.bind(SERVER.REQUEST_HANDLER, FormSchemaController, `get-config`));
        
module.exports = ModuleRouter => {
    ModuleRouter.use(`/form-schema`, Router);
};