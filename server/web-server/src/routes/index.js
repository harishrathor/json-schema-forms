
const router = global.SERVER.ROUTER;
const requestHandler = global.SERVER.REQUEST_HANDLER;

router.get('/', requestHandler);
router.get('/assets/*', requestHandler);

/* 
app.use(/^((?!(api)).)*\/, (req, res) => {
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
});
*/

import '@apiModule/api.module.routing';
import '@coreModule/core.module.routing';
import '@userModule/user.module.routing';