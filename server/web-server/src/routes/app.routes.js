const router = global.SERVER.ROUTER;
const requestHandler = global.SERVER.REQUEST_HANDLER;

router.get('/', requestHandler);
router.get('/file/assets/*', requestHandler);

import '@userModule/user.module.routing';
import '@coreModule/core.module.routing';