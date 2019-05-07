import MongoClient from 'mongodb';
import assert from 'assert';
import dbConfig from '@db/db.config';

// Connection URL
const url = dbConfig.URL;
 
// Database Name
const dbName = dbConfig.DB_NAME;
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
	global.SERVER.DB =  {
		CLIENT: client,
		CONNECTION : client.db(dbName)
	};
	
  /* 
    client.close(); */
});