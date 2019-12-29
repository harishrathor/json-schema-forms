
const router = SERVER.ROUTER;
const requestHandler = SERVER.REQUEST_HANLDER;
const apiRoutePrefix = SERVER.CONSTANTS.API_ROUTE_PREFIX;
const ApiRouter = SERVER.EXPRESS.Router();

router.get('/', requestHandler.defaultHandler);
router.get('/assets/*', requestHandler.assetsHandler);
router.get('/static_files/*', requestHandler.serverStaticFilesHandler);
/* 
app.use(/^((?!(api)).)*\/, (req, res) => {
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
});
*/
require('@apiModule/api.module.routing')(ApiRouter);
require('@coreModule/core.module.routing')(ApiRouter);
require('@userModule/user.module.routing')(ApiRouter);

router.use(`/${apiRoutePrefix}`, ApiRouter);