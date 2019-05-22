
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
        

const apiModule = path.join(modulesDir, 'api');
const coreModule = path.join(modulesDir, 'core');
const userModule = path.join(modulesDir, 'user');

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
    '@db'				: db,
    '@apiModule'		  	: apiModule,
    '@coreModule'		  	: coreModule,
    '@userModule'		  	: userModule,
    '@jsonSchemaFormsDB': jsonSchemaFormsDB
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
    'DB'					: db,
    'API_MODULE'		  	: apiModule,
    'CORE_MODULE'		  	: coreModule,
    'USER_MODULE'		  	: userModule,
    'JSON_SCHEMA_FORMS_DB'  : jsonSchemaFormsDB
};

export { PATHS };
