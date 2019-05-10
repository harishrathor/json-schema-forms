import PATHS from "./paths";

global.SERVER = {
	PATHS
};

import express from "express";
import session from 'express-session';
const app = express();
const Router = express.Router();
import Handler from "@coreModule/classes/request-handler.class";
import sessionConfig from '@configs/session.config';

const globalValues = {
	ROUTER          	: Router,
	APP             	: app,
	REQUEST_HANDLER 	: Handler.handle,
	CONSTANTS			: { API_ROUTE_PREFIX: "/api" }
};

Object.assign(global.SERVER, globalValues);

//Using require because we need to load syncronously;
require("@routes"); 
require('@db');

const PORT = process.env.port || 5000;

app
	.use(
		session(
			sessionConfig
		)
	)
	.use(express.static(SERVER.PATHS.CLIENT_ROOT))
	.use(Router)
	.listen(PORT, err => {
		if (err) {
			console.log("Error in running web server.", err);
		} else {
			console.log(`Web Server running at port ${PORT}.`);
		}
	});



/*  setTimeout(function() {
	require('./file-generator.class');
}, 5000); */

/* import CryptoService from '@coreModule/services/crypto.service';
const crypto = new CryptoService();
//console.log('crypto', crypto);
crypto.plainText = 'Harish';
crypto.secretKey = 'Rathor';
console.log(crypto.encrypt(), crypto.decrypt()); */

