
const router = global.SERVER.ROUTER;
const requestHandler = global.SERVER.REQUEST_HANDLER; 
const apiRoutePrefix = global.SERVER.CONSTANTS.API_ROUTE_PREFIX;

/***********************  Route Example:
  
    router.[HTTP_METHOD](`${apiRoutePrefix}/api/form-schema/{action-name}/:?param1/:?param2`, requestHandler);

********************/
router.post(`${apiRoutePrefix}/api/form-schema/get-form-schema`, requestHandler);
router.post(`${apiRoutePrefix}/api/form-schema/get-config`, requestHandler);