
let SERVER_CONFIG;

if(true || global.SERVER.isDev()) {
    SERVER_CONFIG = {
        ALLOWED_ORIGINS: ['http://localhost:4200']
    };
} else {
    console.log(`Server configuration not defined for '${SERVER.ENV}' environment.`);
}


export default SERVER_CONFIG;

