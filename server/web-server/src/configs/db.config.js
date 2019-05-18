
let dbConfig = {};

if(SERVER.isDev()) {
    dbConfig = {
        PORT: 27017,
        HOSTNAME: 'localhost',
        PROTOCOL: 'mongodb',
        DB_NAME: 'json_schema_forms'
    };
    dbConfig.URL = dbConfig.PROTOCOL + '://' + dbConfig.HOSTNAME + ':' + dbConfig.PORT;
} else {
    console.log(`DB configuration not defined for '${SERVER.ENV}' environment.`);
}


export default dbConfig;

