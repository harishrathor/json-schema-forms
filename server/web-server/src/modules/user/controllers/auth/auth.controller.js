import AbstractController from '@coreModule/classes/abstract.controller';

export default class AuthController extends AbstractController {
    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        
    }

    loginAction(req, res, responseHandler) {
        req.session.username = 'harishrathor';
        responseHandler.sendResponse('text', 'Logged In successfully', true);
    }

    logoutAction(req, res, responseHandler) {
        req.session.destroy();
        responseHandler.sendResponse('text', 'Logged Out successfully', true);
    }
    
}

export { AuthController };