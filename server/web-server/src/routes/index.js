
const router = global.SERVER.ROUTER;
const requestHandler = global.SERVER.REQUEST_HANDLER;

router.get('/', requestHandler);
router.get('/file/assets/*', requestHandler);

import '@apiModule/api.module.routing';
import '@coreModule/core.module.routing';
import '@userModule/user.module.routing';