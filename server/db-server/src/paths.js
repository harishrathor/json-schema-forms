import moduleAliase from 'module-alias';
import path from 'path';


const rootDir = __dirname;


const shared = path.join(rootDir, 'shared');
const modules = path.join(rootDir, 'modules');
const coreModule = path.join(rootDir, 'modules', 'core');
const userModule = path.join(rootDir, 'modules', 'user');


moduleAliase.addAliases({
    '@root'         	  : rootDir,
    '@shared'         	: shared,
    '@modules'			    : modules,
  	'@coreModule'		  	: coreModule,
    '@userModule'     	: userModule
});

let PATHS;
 
export default PATHS = {
	'ROOT'  			    	: rootDir,
	'MODULES'			    : modules,
	'SHARED'			    : shared,
	'CORE_MODULE'		  : coreModule,
	'USER_MODULE'     : userModule
};

export { PATHS };