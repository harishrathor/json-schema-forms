const router = global.SERVER.ROUTER;
const requestHandler = global.SERVER.REQUEST_HANDLER; 
const apiRoutePrefix = global.SERVER.CONSTANTS.API_ROUTE_PREFIX;

router.get(`${apiRoutePrefix}/user/auth/login`, requestHandler);
router.get(`${apiRoutePrefix}/user/auth/logout`, requestHandler);
