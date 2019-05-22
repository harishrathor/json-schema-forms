import PATHS from "./paths";

global.SERVER = {
	PATHS
};

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

import Handler from "@coreModule/classes/request-handler.class";
import sessionConfig from '@configs/session.config';
import LoggerService from '@coreModule/services/logger.service';
const MongoStore = require('connect-mongo')(session);

const globalValues = {
	ENV 				: process.env.NODE_ENV,		
	ROUTER          	: Router,
	APP             	: app,
	REQUEST_HANDLER 	: Handler.handle,
	CONSTANTS			: { API_ROUTE_PREFIX: "/api" },
	UTILS				: {},
	isDev			: function() { return process.env.NODE_ENV === 'development'; },
	isProd			: function() { return process.env.NODE_ENV === 'production'; },
	isStaging			: function() { return process.env.NODE_ENV === 'staging'; },
	LOGGER: 		new LoggerService()
};
Object.assign(global.SERVER, globalValues);

//Using require because we need to load syncronously;
require("@routes"); 
const db = require('@db');

const PORT = process.env.port || 5000;

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

if (SERVER.isDev()) {
	app.use(logger('dev'));
}

db.default.then(() => {
	sessionConfig.store = new MongoStore({ db: global.SERVER.DB.CONNECTION });
	app.use(
		session(
			sessionConfig
		)
	)
	.use(Router);
	startServer();
}).catch((err) => {
	SERVER.LOGGER.logInfo('Error in DB connection.').logError(err);
	startServer();
});

let serverRunning = false;

function startServer() {
	if (!serverRunning) {
		app.listen(PORT, err => {
			if (err) {
				console.log("Error in running web server.", err);
			} else {
				console.log(`Web(${process.env.NODE_ENV}) Server running at port ${PORT}.`);
				serverRunning = true;
			}
		});
	}
}

/*  setTimeout(function() {
	require('@coreModule/classes/file-generator.class');
}, 5000); */

/* import CryptoService from '@coreModule/services/crypto.service';
const crypto = new CryptoService();
//console.log('crypto', crypto);
crypto.plainText = 'Harish';
crypto.secretKey = 'Rathor';
console.log(crypto.encrypt(), crypto.decrypt()); */

