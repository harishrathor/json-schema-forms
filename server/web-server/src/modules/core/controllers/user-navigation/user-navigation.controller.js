
import AbstractController from '@coreModule/base/abstract.controller';

export default class UserNavigationController extends AbstractController {

    initialize() {
        super.initialize();
    }

    getUserMenuDataAction() {
        this.responseHanlder.end('User Menu Data Action');
    }

}

export {
    UserNavigationController
};
        