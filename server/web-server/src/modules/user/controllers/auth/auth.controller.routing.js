
const router = global.SERVER.ROUTER;
const requestHandler = global.SERVER.REQUEST_HANDLER; 
const apiRoutePrefix = global.SERVER.CONSTANTS.API_ROUTE_PREFIX;

/***********************  Route Example:
  
    router.[HTTP_METHOD](`${apiRoutePrefix}/user/auth/{action-name}/:?param1/:?param2`, requestHandler);

********************/
router.get(`${apiRoutePrefix}/user/auth/login/:username/:password`, requestHandler);
//router.get(`${apiRoutePrefix}/user/auth/login`, requestHandler);
router.get(`${apiRoutePrefix}/user/auth/logout`, requestHandler);
router.get(`${apiRoutePrefix}/user/auth/test`, requestHandler);
router.get(`${apiRoutePrefix}/user/auth/context`, requestHandler);
        