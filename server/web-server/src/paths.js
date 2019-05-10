
import moduleAliase from 'module-alias';
import path from 'path';

const rootDir = __dirname;

const config = path.join(rootDir, 'configs');
const clientRoot = path.join(rootDir, '..', '..','..','web-client', 'dist', 'json-form-generator-client');
const shared = path.join(rootDir, 'shared');
const modules = path.join(rootDir, 'modules');
const routes = path.join(rootDir, 'routes');
const db = path.join(rootDir, 'db');
const jsonSchemaFormsDB = path.join(rootDir, 'db', 'json_schema_forms');


const apiModule = path.join(rootDir, 'modules', 'api');
const coreModule = path.join(rootDir, 'modules', 'core');
const userModule = path.join(rootDir, 'modules', 'user');

moduleAliase.addAliases({
    '@root'         	: rootDir,
    '@configs'      	: config,
    '@clientRoot'    	: clientRoot,
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
    'ROOT'  			    	: rootDir,
    'CONFIGS'			    : config,
    'MODULES'			    : modules,
    'CLIENT_ROOT'		  	: clientRoot,
    'SHARED'			    : shared,
    'ROUTES'     			: routes,
    'DB'					: db,
    '@API_MODULE'		  	: apiModule,
    '@CORE_MODULE'		  	: coreModule,
    '@USER_MODULE'		  	: userModule,
    'JSON_SCHEMA_FORMS_DB'  : jsonSchemaFormsDB
};

export { PATHS };
