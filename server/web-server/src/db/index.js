import { MongoClient } from 'mongodb';
import { CLIENTS_CONFIG, ACTIVE_CLIENTS_NAMES_ARR } from '@configs/clients.config';

function getConnection(clientName) {
    if (!clientName) {
        clientName = SERVER.GLOBAL_PROPS.CURRENT_CLIENT_NAME;
    }
    if (clientName && global.SERVER.DB.CLIENTS_DB_CONNECTIONS[clientName]) {
        return global.SERVER.DB.CLIENTS_DB_CONNECTIONS[clientName].CONNECTION;
    }
    return null;
}

function getClient(clientName) {
    if (!clientName) {
        clientName = SERVER.GLOBAL_PROPS.CURRENT_CLIENT_NAME;
    }
    if (clientName && global.SERVER.DB.CLIENTS_DB_CONNECTIONS[clientName]) {
        return global.SERVER.DB.CLIENTS_DB_CONNECTIONS[clientName].DB_CLIENT;
    }
    return null;
}
let connectionPromise = null;
function makeConnection() {
    if (connectionPromise) {
        return connectionPromise;
    }
    connectionPromise = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        let connectionCounter = 0;
        let errorCounter = 0;
        const clientsCount = ACTIVE_CLIENTS_NAMES_ARR.length;
        const connectionErrObj = {};
        const clientsConnections = {};
        function onDBConnection(clientName, dbName, err, dbClient) {
            connectionCounter++;
            if (err) {
                errorCounter++;
                connectionErrObj[clientName] = err;
            } else {
                const dbConnection = dbClient.db(dbName);
    
                const connection =  {
                    DB_CLIENT       : dbClient,
                    CONNECTION      : dbConnection
                };
                
                db.CLIENTS_DB_CONNECTIONS[clientName] = connection;
                clientsConnections[clientName] = connection;
                console.log(`Successfully made DB connection to server for client ${clientName}.`);
            }
            if (clientsCount === connectionCounter) {
                const response = {
                    error   : connectionErrObj,
                    success :  clientsConnections
                };
                if (clientsCount === errorCounter) {
                    reject(response);
                } else {
                    resolve(response);
                }
            }
        }
        for (let clientName of ACTIVE_CLIENTS_NAMES_ARR) {
            const clientConfig = CLIENTS_CONFIG[clientName];
            const dbConfig = clientConfig.config[process.env.NODE_ENV].db;
            const connectionURL = dbConfig.PROTOCOL + '://' + dbConfig.HOSTNAME + ':' + dbConfig.PORT;
            dbConfig.URL = connectionURL;
            MongoClient.connect(connectionURL, onDBConnection.bind(dbConfig, clientName, dbConfig.DB_NAME)); 
        }
    });
    return connectionPromise;
}

const db = {
    CLIENTS_DB_CONNECTIONS: {},
    makeConnection,
    getConnection,
    getClient
};

export const DB = db;
global.SERVER.DB = db; 
 
