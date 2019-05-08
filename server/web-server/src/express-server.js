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

//app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))



app
	.use(
		session(
			sessionConfig
		)
	)
	.use(express.static(SERVER.PATHS.CLIENT_ROOT))
	.use(Router)
	.all((req, res) => {
		Handler.handle.call(Handler, req, res);
	})
	.listen(PORT, err => {
		if (err) {
			console.log("Error in running web server.", err);
		} else {
			console.log(`Web Server running at port ${PORT}.`);
		}
	});
