import PATHS from "./paths";
import express from "express";
import session from 'express-session';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const Router = express.Router();

global.SERVER = {
	PATHS
};

import Handler from "@coreModule/classes/request-handler.class";
import sessionConfig from '@configs/session.config';
import LoggerService from '@coreModule/services/logger.service';


const MongoStore = require('connect-mongo')(session);

const globalValues = {
	ENV 				: process.env.NODE_ENV,		
	ROUTER          	: Router,
	EXPRESS 			: express,
	APP             	: app,
	REQUEST_HANLDER				: Handler,
	API_REQUEST_HANDLER			: Handler.apiRequestHandler,
	CONSTANTS			: { API_ROUTE_PREFIX: "api" },
	UTILS				: {},
	isDev				: function() { return process.env.NODE_ENV === 'development'; },
	isProd				: function() { return process.env.NODE_ENV === 'production'; },
	isStaging			: function() { return process.env.NODE_ENV === 'staging'; },
	LOGGER				: new LoggerService(),
	DATA				: {},
	GLOBAL_PROPS		: {} 		
};
Object.assign(global.SERVER, globalValues);

import SERVER_CONFIG from '@configs/server.config';

//Using require because we need to load syncronously;
const { makeConnection, getConnection } = require('@db');
require("@routes"); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors({
	origin: function(origin, callback){
	  // allow requests with no origin 
	  // (like mobile apps or curl requests)
	  if(!origin) return callback(null, true);
	  if(SERVER_CONFIG.ALLOWED_ORIGINS.indexOf(origin) === -1){
		var msg = 'The CORS policy for this site does not ' +
				  'allow access from the specified Origin.';
		return callback(new Error(msg), false);
	  }
	  return callback(null, true);
	}
  }));

app.use(express.static(SERVER.PATHS.STATIC_FILES));

//app.use(vhost(CLIENT_INFO.));

if (SERVER.isDev()) {
	app.use(logger('dev'));
}

makeConnection()
.then(() => {
	sessionConfig.store = new MongoStore({ db: getConnection() });
	app.use(
		session(
			sessionConfig
		)
	)
	.use(Router);
	startServer();
}).catch(err => {
	SERVER.LOGGER.logInfo('Error in session configuration.').logError(err);
	startServer();
});

let serverRunning = false;
function startServer() {
	if (!serverRunning) {
		const PORT = process.env.PORT || 5000;		
		app.listen(PORT, err => {
			if (err) {
				console.log("Error in running web server.", err);
			} else {
				console.log(`Web(${process.env.NODE_ENV}) Server running at port ${PORT}.`);
				serverRunning = true;
			}
		});
		//console.log('httpServerInstance', httpServerInstance);

	}
}

/* 
 setTimeout(function() {
	const fileGenerater = require('@coreModule/classes/file-generator.class');
	const generater = new fileGenerater.FileGeneratorClass();
	generater.generateController('core', 'user-navigation');
}, 5000); */

/* import crypto from '@coreModule/services/crypto.service';
//console.log('crypto', crypto);
crypto.plainText = 'Harish';
crypto.secretKey = 'Rathor';
console.log(crypto.encrypt(), crypto.decrypt()); */

