
/*

Note: Please do not edit it. This file is written by server.

*/

import fs from 'fs';
import utils from '@shared/utils.class';
import { MASTER_CLIENT_NAME } from './configs/clients.config';

import moduleAliase from 'module-alias';
import path from 'path';

const srcRootDir = __dirname;
const rootDir = path.resolve(srcRootDir, '..');

const config = path.join(srcRootDir, 'configs');
const appClientsRoot = path.join(srcRootDir, '..', '..','..','web-client', 'apps', MASTER_CLIENT_NAME, 'clients');
const shared = path.join(srcRootDir, 'shared');
const modules = path.join(srcRootDir, 'modules');
const routes = path.join(srcRootDir, 'routes');
const db = path.join(srcRootDir, 'db');
const modulesDir = path.join(srcRootDir, 'modules');
const staticFiles = path.join(rootDir, 'static_files');

let modulesAliasesDirObj = {};
let modulesPathsObj = {};

let moduleDirArr = fs.readdirSync(modulesDir);
for (let moduleName of moduleDirArr) {
    moduleName = `${moduleName}-module`;
    const camelCasedModuleName = utils.toCamelCase(moduleName, '-');
    const upperCaseModuleName = moduleName.replace('-', '_').toUpperCase();
    const dir = path.join(modulesDir, moduleName);
    modulesAliasesDirObj[`@${camelCasedModuleName}`] = dir;
    modulesPathsObj[upperCaseModuleName] = dir;
}

let dbDirAliasesObj = {};
let dbDirPathsObj = {};

let dbDirArr = fs.readdirSync(db);
for (let dbName of dbDirArr) {
    dbName = `${dbName}-DB`;
    const camelCasedDBDirName = utils.toCamelCase(dbName, '-');
    const upperCaseMDBDirName = dbName.replace('-', '_').toUpperCase();
    const dir = path.join(db, dbName);
    dbDirAliasesObj[`@${camelCasedDBDirName}`] = dir;
    dbDirPathsObj[upperCaseMDBDirName] = dir;
}


let moduleAliaseObj = {
    '@root'         	: rootDir,
    '@srcRoot'          : srcRootDir,
    '@configs'      	: config,
    '@appClientsRoot'   : appClientsRoot,
    '@shared'         	: shared,
    '@routes'         	: routes, 
    '@modules'			: modules,
    '@db'				: db,
    '@staticFiles'      : staticFiles
};
Object.assign(moduleAliaseObj, modulesAliasesDirObj, dbDirAliasesObj);


moduleAliase.addAliases(moduleAliaseObj);

let PATHS = {
    'ROOT'  			    : rootDir,
    'SRC_ROOT'              : srcRootDir,
    'CONFIGS'			    : config,
    'MODULES'			    : modules,
    'APP_CLIENTS_ROOT'		: clientRoot,
    'SHARED'			    : shared,
    'ROUTES'     			: routes,
    'DB'					: db,
    'STATIC_FILES'          : staticFiles
};
Object.assign(PATHS, modulesPathsObj, dbDirPathsObj)
export default PATHS;

export { PATHS };
