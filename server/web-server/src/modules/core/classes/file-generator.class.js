import fs from 'fs';
import path from 'path';
import utils from '@shared/utils.class';



export class FileGenerator {

    constructor() {
        this.rootDir = paths.join(global.SERVER.PATHS.ROOT, '..', 'src');
        this.dbName = 'json_schema_forms';
    }

    createAndWriteFile(filePath, type, fileContent = ''){
        if (fs.existsSync(filePath)) {
            return false;
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
import AbstractModule from '@coreModule/classes/abstract.module';

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
import AbstractController from '@coreModule/classes/abstract.controller';

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

    _getControllerRoutingFileDefaultContent(controllerName) {
        const content = `
const router = global.SERVER.ROUTER;
const requestHandler = global.SERVER.REQUEST_HANDLER; 
const apiRoutePrefix = global.SERVER.CONSTANTS.API_ROUTE_PREFIX;
        `;
        return content;
    }

    _getCollectionFileDefaultContent(moduleName, collectionName) {
        const collectionClassName = utils.toClassName(collectionName, '_') + 'Collection';
        const content = `
import AbstractCollection from '@jsonSchemaFormsDB/core/classes/abstract.collection';

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
        const modulePath = this.getModuleDir(moduleName)
        return path.join(modulePath, 'controllers', controllerName);
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

              
                const dbModulePath = this.getDBModuleDir(moduleName);
                if (this.createAndWriteFile(dbModulePath,  'D')) {
                    this.createAndWriteFile(path.join(dbModulePath, 'classes'),  'D');
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
                const routingDefaultContent = this._getControllerRoutingFileDefaultContent(controllerName); 
                this.createAndWriteFile(controllerRoutingFile, 'F', routingDefaultContent);
                console.log('Created Controller.');
            }
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
generater.generateModule('api');
generater.generateController('api', 'api');
generater.generateCollection('api', 'api_users'); */