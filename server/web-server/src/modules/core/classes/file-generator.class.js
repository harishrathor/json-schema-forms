import fs from 'fs';
import path from 'path';
import utils from '@shared/utils.class';



export class FileGenerator {

    constructor() {
        this.rootDir = path.join(global.SERVER.PATHS.ROOT, '..', 'src');
        this.dbName = 'json_schema_forms';
    }

    createAndWriteFile(filePath, type, fileContent = ''){
        if (fs.existsSync(filePath)) {
            return true;
        }
        if (type === 'D') {
            fs.mkdirSync(filePath);
        } else if (type ==='F') {
            fs.writeFileSync(filePath, fileContent);
        }
        return true;
    }

    _getModuleFileDefaultContent(moduleName) {
        const moduleClassName = utils.toClassName(moduleName, '/') + 'Module';
        const content = `
import AbstractModule from '@coreModule/base/abstract.module';

export default class ${moduleClassName} extends AbstractModule {

    initialize() {
        super.initialize();
        this._controllers = {};
    }

}
export {
    ${moduleClassName}
};
`;
        return content;
    }

    _getControllerFileDefaultContent(controllerName) {
        const controllerClassName = utils.toClassName(controllerName, '-') + 'Controller';
        const content = `
import AbstractController from '@coreModule/base/abstract.controller';

export default class ${controllerClassName} extends AbstractController {

    initialize() {
        super.initialize();
    }

}

export {
    ${controllerClassName}
};
        `;
        return content;
    }

    _getServiceFileDefaultContent(controllerName) {
        const controllerClassName = utils.toClassName(controllerName, '-') + 'Service';
        const content = `
import AbstractService from '@coreModule/base/abstract.service';

export default class ${controllerClassName} extends AbstractService {

    initialize() {
        super.initialize();
    }

}

export {
    ${controllerClassName}
};
        `;
        return content;
    }

    _getHelperFileDefaultContent(controllerName) {
        const controllerClassName = utils.toClassName(controllerName, '-') + 'Helper';
        const content = `
import AbstractHelper from '@coreModule/base/abstract.helper';

export default class ${controllerClassName} extends AbstractHelper {

    initialize() {
        super.initialize();
    }

}

export {
    ${controllerClassName}
};
        `;
        return content;
    }

    _getClassFileDefaultContent(controllerName) {
        const controllerClassName = utils.toClassName(controllerName, '-') + 'Class';
        const content = `
import AbstractClass from '@coreModule/base/abstract.class';

export default class ${controllerClassName} extends AbstractClass {

    initialize() {
        super.initialize();
    }

}

export {
    ${controllerClassName}
};
        `;
        return content;
    }

    _getFunctionFileDefaultContent(controllerName) {
        const controllerClassName = utils.toClassName(controllerName, '-') + 'Function';
        const content = `
export default function ${controllerClassName}() {
}

export {
    ${controllerClassName}
};
        `;
        return content;
    }

    _getControllerRoutingFileDefaultContent(moduleName, controllerName) {
        const content = `
const router = global.SERVER.ROUTER;
const requestHandler = global.SERVER.REQUEST_HANDLER; 
const apiRoutePrefix = global.SERVER.CONSTANTS.API_ROUTE_PREFIX;

/***********************  Route Example:
  
    router.[HTTP_METHOD](\`\${apiRoutePrefix}/${moduleName}/${controllerName}/{action-name}/:?param1/:?param2\`, requestHandler);

********************/
        `;
        return content;
    }

    _getCollectionFileDefaultContent(moduleName, collectionName) {
        const collectionClassName = utils.toClassName(collectionName, '_') + 'Collection';
        const content = `
import AbstractCollection from '@jsonSchemaFormsDB/core/base/abstract.collection';

export default class ${collectionClassName} extends AbstractCollection {

    initialize() {
        super.initialize();
        this.collectionName = '${this.getDBActualCollectionName(moduleName, collectionName)}';
    }

}

export {
    ${collectionClassName}
};
        `;
        return content;
    }

    getModuleDir(moduleName) {
        return path.join(this.rootDir, 'modules', moduleName);
    }

    getControllerDir(moduleName, controllerName) {
        const modulePath = this.getModuleDir(moduleName);
        return path.join(modulePath, 'controllers', controllerName);
    }

    getServiceDir(moduleName, serviceName) {
        const modulePath = this.getModuleDir(moduleName);
        return path.join(modulePath, 'services');
    }

    getHelperDir(moduleName, serviceName) {
        const modulePath = this.getModuleDir(moduleName);
        return path.join(modulePath, 'helpers');
    }

    getFunctionDir(moduleName, fnName) {
        const modulePath = this.getModuleDir(fnName);
        return path.join(modulePath, 'functions');
    }

    getClassDir(moduleName, className) {
        const modulePath = this.getModuleDir(className);
        return path.join(modulePath, 'classes');
    }

    getDBModuleDir(moduleName) {
        const dbFolder = path.join(`${this.rootDir}`, 'db', this.dbName);
        return path.join(dbFolder, moduleName);
    }

    generateModule(moduleName) {
        const moduleDir = this.getModuleDir(moduleName);
        if (this.createAndWriteFile(moduleDir, 'D')) {
            const moduleFile = path.join(moduleDir, `${moduleName}.module.js`);
            const defaultContent = this._getModuleFileDefaultContent(moduleName);
            if (this.createAndWriteFile(moduleFile, 'F', defaultContent)) {
                const moduleRoutingFile = path.join(moduleDir, `${moduleName}.module.routing.js`);
                this.createAndWriteFile(moduleRoutingFile, 'F');
                this.createAndWriteFile(path.join(moduleDir, 'classes'),  'D');
                this.createAndWriteFile(path.join(moduleDir, 'controllers'),  'D');
                this.createAndWriteFile(path.join(moduleDir, 'functions'),  'D');
                this.createAndWriteFile(path.join(moduleDir, 'services'),  'D');
                this.createAndWriteFile(path.join(moduleDir, 'helpers'),  'D');

              
                const dbModulePath = this.getDBModuleDir(moduleName);
                if (this.createAndWriteFile(dbModulePath,  'D')) {
                    this.createAndWriteFile(path.join(dbModulePath, 'collections'),  'D');;
                }
                console.log('Created Module.');
            }
        }
    }

    generateController(moduleName, controllerName) {
        const controllerDir = this.getControllerDir(moduleName, controllerName);
        if (this.createAndWriteFile(controllerDir, 'D')) {
            const controllerFile = path.join(controllerDir, `${controllerName}.controller.js`);
            const defaultContent = this._getControllerFileDefaultContent(controllerName);
            if (this.createAndWriteFile(controllerFile, 'F', defaultContent)) {
                const controllerRoutingFile = path.join(controllerDir, `${controllerName}.controller.routing.js`);
                const routingDefaultContent = this._getControllerRoutingFileDefaultContent(moduleName, controllerName); 
                this.createAndWriteFile(controllerRoutingFile, 'F', routingDefaultContent);
                console.log('Created Controller.');
            }
        }

    }

    generateService(moduleName, serviceName) {
        const controllerDir = this.getServiceDir(moduleName, serviceName);
        if (this.createAndWriteFile(controllerDir, 'D')) {
            const controllerFile = path.join(controllerDir, `${serviceName}.service.js`);
            const defaultContent = this._getServiceFileDefaultContent(serviceName);
            this.createAndWriteFile(controllerFile, 'F', defaultContent);
            console.log('Created Service.');
        }

    }

    generateHelper(moduleName, helperName) {
        const controllerDir = this.getHelperDir(moduleName, helperName);
        if (this.createAndWriteFile(controllerDir, 'D')) {
            const controllerFile = path.join(controllerDir, `${helperName}.helper.js`);
            const defaultContent = this._getHelperFileDefaultContent(helperName);
            this.createAndWriteFile(controllerFile, 'F', defaultContent)
            console.log('Created Helper.');
        }

    }

    generateClass(moduleName, serviceName) {
        const controllerDir = this.getClassDir(moduleName, serviceName);
        if (this.createAndWriteFile(controllerDir, 'D')) {
            const controllerFile = path.join(controllerDir, `${serviceName}.class.js`);
            const defaultContent = this._getClassFileDefaultContent(serviceName);
            this.createAndWriteFile(controllerFile, 'F', defaultContent);
            console.log('Created Class.');
        }

    }

    generateFunction(moduleName, helperName) {
        const controllerDir = this.getFunctionDir(moduleName, helperName);
        if (this.createAndWriteFile(controllerDir, 'D')) {
            const controllerFile = path.join(controllerDir, `${helperName}.function.js`);
            const defaultContent = this._getFunctionFileDefaultContent(helperName);
            this.createAndWriteFile(controllerFile, 'F', defaultContent)
            console.log('Created Function.');
        }

    }

    getDBActualCollectionName(moduleName, collectionName) {
        return `jsf_${moduleName}_${collectionName}`;
    }

    generateCollection(moduleName, collectionName) {
        const collectionFile = path.join(this.getDBModuleDir(moduleName), 'collections', `${collectionName}.collection.js`);
        const defaultContent = this._getCollectionFileDefaultContent(moduleName, collectionName);
        this.createAndWriteFile(collectionFile, 'F', defaultContent);
        global.SERVER.DB.CONNECTION.createCollection(this.getDBActualCollectionName(moduleName, collectionName), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Created Collection.');
            }
        });
    }

}

/* 
const generater = new FileGenerator();
//generater.generateModule('api');
generater.generateController('api', 'form-schema'); */
/* 
const generater = new FileGenerator();
const moduleName = 'test';
generater.generateModule('test');
generater.generateClass(moduleName, 'test');
generater.generateController(moduleName, 'test');
generater.generateFunction(moduleName, 'test');
generater.generateHelper(moduleName, 'test');
generater.generateService(moduleName, 'test');
generater.generateCollection(moduleName, 'test_col'); */