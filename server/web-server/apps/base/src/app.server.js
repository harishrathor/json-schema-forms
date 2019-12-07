import PATHS from "./app.paths";
import express from "express";
import session from 'express-session';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import vhost from 'vhost';
import { CLIENTS_URL_MAPPING } from '@configs/clients.config';

const app = express();
const Router = express.Router();

global.SERVER = {
	PATHS
};

import Handler from "@coreModule/classes/request-handler.class";
import sessionConfig from '@configs/session.config';
import LoggerService from '@coreModule/services/logger.service';
import { MASTER_CLIENT_NAME } from '@configs/clients.config';

const MongoStore = require('connect-mongo')(session);

const globalValues = {
	ENV 				: process.env.NODE_ENV,		
	ROUTER          	: Router,
	APP             	: app,
	REQUEST_HANDLER 	: Handler.handle,
	CONSTANTS			: { API_ROUTE_PREFIX: "/api" },
	UTILS				: {},
	isDev				: function() { return process.env.NODE_ENV === 'development'; },
	isProd				: function() { return process.env.NODE_ENV === 'production'; },
	isStaging			: function() { return process.env.NODE_ENV === 'staging'; },
	LOGGER				: new LoggerService(),
	DATA				: {},
	GLOBAL_PROPS		: {} 		
};
Object.assign(global.SERVER, globalValues);

//Using require because we need to load syncronously;
require("@routes"); 
require('@db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(express.static(SERVER.PATHS.CLIENT_ROOT));
app.use(express.static(SERVER.PATHS.STATIC_FILES));

app.set('masterClientName', MASTER_CLIENT_NAME);

//app.use(vhost(CLIENT_INFO.));

if (SERVER.isDev()) {
	app.use(logger('dev'));
}

global.SERVER.DB.makeConnection().then(() => {
	sessionConfig.store = new MongoStore({ db: global.SERVER.DB.getConnection(MASTER_CLIENT_NAME) });
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
let httpServer = null;
function startServer() {
	if (!serverRunning) {
		const PORT = process.env.PORT || 5000;		
		httpServer = app.listen(PORT, err => {
			if (err) {
				console.log("Error in running web server.", err);
			} else {
				console.log(`Web(${process.env.NODE_ENV}) Server running at port ${PORT}.`);
				serverRunning = true;
				registerClients();
			}
		});
		//console.log('httpServerInstance', httpServerInstance);

	}
}

function registerClients() {
	for (let clientUrl in CLIENTS_URL_MAPPING) {
		app.use(vhost(clientUrl, function (req, res) {
			// handle req + res belonging to api.example.com
			// pass the request to a standard Node.js HTTP server
			httpServer.emit('request', req, res);
		}));
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

