
let dbConfig = {};

if(SERVER.isDev()) {
    dbConfig = {
        PORT: 27017,
        HOSTNAME: 'localhost',
        PROTOCOL: 'mongodb',
        DB_NAME: 'json_form_schema'
    };
    
    dbConfig.URL = dbConfig.PROTOCOL + '://' + dbConfig.HOSTNAME + ':' + dbConfig.PORT;
}


export default dbConfig;

