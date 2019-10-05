
import AbstractClass from '@coreModule/base/abstract.class';
import fs from 'fs';
import path from 'path';
import utils from '@shared/utils.class';

export default class FileGeneratorClass extends AbstractClass {

    initialize() {
        super.initialize();
        this.rootDir = SERVER.PATHS.ROOT; //path.join(global.SERVER.PATHS.ROOT, '..', 'src');
        this.srcRootDir = path.join(this.rootDir, 'src');
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
import { controllers } from '@${moduleName}Module/${moduleName}.module.data';

export default class ${moduleClassName} extends AbstractModule {

    initialize() {
        super.initialize();
        this._controllers = controllers;
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

export class ${controllerClassName} extends AbstractService {

    initialize() {
        super.initialize();
    }

}

export {
    ${controllerClassName}
};

export default  new ${controllerClassName}();
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
        this.postInit();
    }

}

export {
    ${collectionClassName}
};
        `;
        return content;
    }

    _getModuleRoutingFileContent(moduleName) {
        const moduleDir = this.getModuleDir(moduleName);
        const controllerDir = path.join(moduleDir, 'controllers');
        const controllersDirs = fs.readdirSync(controllerDir, {
            withFileTypes: true
        });
        let content = ` `;
        for(const dirent of controllersDirs) {
            if(dirent.isDirectory()) {
                const controllerName = dirent.name;
                content += `
/*

Note: Please do not edit it. This file is written by server.

*/

export * from '@${moduleName}Module/controllers/${controllerName}/${controllerName}.controller.routing';`;
            }
        }
        return content;
        
    }

    _getModuleDataFileContent(moduleName) {
        const moduleDir = this.getModuleDir(moduleName);
        const controllerDir = path.join(moduleDir, 'controllers');
        const controllersDirs = fs.readdirSync(controllerDir, {
            withFileTypes: true
        });
        let controllersImports = ``;
        let controllersClassValue = ``;
        for(const dirent of controllersDirs) {
            if(dirent.isDirectory()) {
                const controllerName = dirent.name;
                const controllerClassName = utils.toClassName(controllerName, '-') + 'Controller';
                controllersImports += `
/*

Note: Please do not edit it. This file is written by server.

*/
                
import { ${controllerClassName} } from '@${moduleName}Module/controllers/${controllerName}/${controllerName}.controller';`;
            controllersClassValue += `
        '${controllerName}':     ${controllerClassName},`;
            }
        }

        const content = `
${controllersImports}

export const controllers = {${controllersClassValue}
};`;
        return content;
        
    }

    _getRoutingFileContent() {
        const moduleDir = path.join(this.srcRootDir, 'modules');
        const modulesDirs = fs.readdirSync(moduleDir, {
            withFileTypes: true
        });
        let content = `
/*

Note: Please do not edit it. This file is written by server.

*/
        

const router = global.SERVER.ROUTER;
const requestHandler = global.SERVER.REQUEST_HANDLER;

router.get('/', requestHandler);
router.get('/assets/*', requestHandler);
`;
        for(const dirent of modulesDirs) {
            if(dirent.isDirectory()) {
                const moduleName = dirent.name;
                content += `
import '@${moduleName}Module/${moduleName}.module.routing';`;
            }
        }
        return content;
    }

    _getPathsFileContent() {
        //const pathsFile = paht.join(this.srcRootDir, 'paths.js');
        let alias = ``;
        let strPath = ``;
        let pathsVar =  ``;

        const moduleDir = path.join(this.srcRootDir, 'modules');
        const modulesDirs = fs.readdirSync(moduleDir, {
            withFileTypes: true
        });
       
        for(const dirent of modulesDirs) {
            if(dirent.isDirectory()) {
                const moduleName = dirent.name;
                pathsVar += `
const ${moduleName}Module = path.join(modulesDir, '${moduleName}');`;
                alias += `
    '@${moduleName}Module'		: ${moduleName}Module,`;
                strPath += `
    '${moduleName.toUpperCase()}_MODULE'		  	: ${moduleName}Module,`;
            }
        }

        const conent = `
/*

Note: Please do not edit it. This file is written by server.

*/



import moduleAliase from 'module-alias';
import path from 'path';

const srcRootDir = __dirname;
const rootDir = path.resolve(srcRootDir, '..');

const config = path.join(srcRootDir, 'configs');
const clientRoot = path.join(srcRootDir, '..', '..','..','web-client', 'dist', 'json-form-generator-client');
const shared = path.join(srcRootDir, 'shared');
const modules = path.join(srcRootDir, 'modules');
const routes = path.join(srcRootDir, 'routes');
const db = path.join(srcRootDir, 'db');
const jsonSchemaFormsDB = path.join(srcRootDir, 'db', 'json_schema_forms');
const modulesDir = path.join(srcRootDir, 'modules');
const assetsPath = path.join(clientRoot, 'assets');
const privateAssetsPath = path.join(assetsPath, 'private');
const staticFiles = path.join(rootDir, 'static_files');
        
${pathsVar}

moduleAliase.addAliases({
    '@root'         	: rootDir,
    '@srcRoot'          : srcRootDir,
    '@configs'      	: config,
    '@clientRoot'    	: clientRoot,
    '@assets'           : assetsPath,
    '@privateAssets'    : privateAssetsPath,
    '@shared'         	: shared,
    '@routes'         	: routes, 
    '@modules'			: modules,
    '@db'				: db,${alias}
    '@jsonSchemaFormsDB': jsonSchemaFormsDB,
    '@staticFiles'      : staticFiles
});

let PATHS;
    
export default PATHS = {
    'ROOT'  			    : rootDir,
    'SRC_ROOT'              : srcRootDir,
    'CONFIGS'			    : config,
    'MODULES'			    : modules,
    'CLIENT_ROOT'		  	: clientRoot,
    'ASSETS'                : assetsPath,
    'PRIVATE_ASSETS'        : privateAssetsPath,
    'SHARED'			    : shared,
    'ROUTES'     			: routes,
    'DB'					: db,${strPath}
    'JSON_SCHEMA_FORMS_DB'  : jsonSchemaFormsDB,
    'STATIC_FILES'          : staticFiles
};

export { PATHS };
`;
    return conent;
    }

    getModuleDir(moduleName) {
        return path.join(this.srcRootDir, 'modules', moduleName);
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
        const dbFolder = path.join(`${this.srcRootDir}`, 'db', this.dbName);
        return path.join(dbFolder, moduleName);
    }

    updateRoutingFile() {
        const routingFile = path.join(this.srcRootDir, 'routes', 'index.js');
        const routingFileContent = this._getRoutingFileContent();
        fs.unlinkSync(routingFile);
        this.createAndWriteFile(routingFile, 'F', routingFileContent);
        console.log('Updated Routing File.');
    }

    updatePathsFile() {
        const file = path.join(this.srcRootDir,  'paths.js');
        const fileContent = this._getPathsFileContent();
        console.log('file', file);
        fs.unlinkSync(file);
        this.createAndWriteFile(file, 'F', fileContent);
        console.log('Updated Paths File.');
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
                const moduleDataFile = path.join(moduleDir, `${moduleName}.module.data.js`);
                const moduleDataFileContent = this._getModuleDataFileContent(moduleName);
                this.createAndWriteFile(moduleDataFile, 'F', moduleDataFileContent);
                console.log('Created Module.');
                this.updatePathsFile();
                this.updateRoutingFile();
            }
        }
    }

    updateModuleRoutingFile(moduleName) {
        const moduleDir = this.getModuleDir(moduleName);
        const routingFile = path.join(moduleDir, `${moduleName}.module.routing.js`);
        const routingFileContent = this._getModuleRoutingFileContent(moduleName);
        fs.unlinkSync(routingFile);
        this.createAndWriteFile(routingFile, 'F', routingFileContent);
        console.log('Updated Module Routing File.');
    }

    updateModuleDataFile(moduleName) {
        const moduleDir = this.getModuleDir(moduleName);
        const file = path.join(moduleDir, `${moduleName}.module.data.js`);
        const fileContent = this._getModuleDataFileContent(moduleName);
        fs.unlinkSync(file);
        this.createAndWriteFile(file, 'F', fileContent);
        console.log('Updated Module Data File.');
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
                this.updateModuleRoutingFile(moduleName);
                this.updateModuleDataFile(moduleName);
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
        global.SERVER.DB.getConnection().createCollection(this.getDBActualCollectionName(moduleName, collectionName), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Created Collection.');
            }
        });
    }

}

export {
    FileGeneratorClass
};




const generater = new FileGeneratorClass();
//generater.updatePathsFile();
//generater.generateModule('api');
//generater.generateService('core', 'logger');
/* 
const generater = new FileGeneratorClass();
const moduleName = 'test6';
generater.generateModule(moduleName);
generater.generateController(moduleName, 'test2'); */
/*generater.generateClass(moduleName, 'test');
 generater.generateFunction(moduleName, 'test');
generater.generateHelper(moduleName, 'test');
generater.generateService(moduleName, 'test');
generater.generateCollection(moduleName, 'test_col'); */
//generater.generateService('core', 'cryptography');