import { MongoClient } from 'mongodb';
import assert from 'assert';
import dbConfig from '@configs/db.config';

// Connection URL
const url = dbConfig.URL;
 
// Database Name
const dbName = dbConfig.DB_NAME;
 
export default new Promise((resolve, reject) => {
    
    // Use connect method to connect to the server
    if (url) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                reject(err)
            } else {
                let db = null;
                if (dbName) {
                    db = client.db(dbName);
                }

                const connection =  {
                    CLIENT        : client,
                    CONNECTION    : db
                };
                global.SERVER.DB = connection;
                console.log(`Successfully made DB connection to server: ${url}. Database name: ${dbName}`);
                resolve(connection);
                /* 
                    client.close(); */
            }
        });
    } 
  
});