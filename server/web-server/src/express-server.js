import PATHS from "./paths";
import express from "express";
import session from 'express-session';

const app = express();
const Router = express.Router();

global.SERVER = {
	PATHS
};

import Handler from "@coreModule/classes/request-handler";

const globalValues = {
	ROUTER          	: Router,
	APP             	: app,
	REQUEST_HANDLER 	: Handler.handle,
	CONSTANTS			: {
					API_ROUTE_PREFIX: "/api"
				}
};

Object.assign(global.SERVER, globalValues);

require("@routes/app.routes"); //Using require because we need to load it  syncronously;

const PORT = process.env.port || 5000;

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))



app
	.use(
		session(
			{
				secret: 'yC9GEfKs57ythfgdfdsisdf5MTPhpzXLs45ytyjgjTDQ3UBzdHiRCTbi',
				resave: false,
				saveUninitialized: true,
				name: '__uCTN',
				cookie: { 
					secure: true ,
					expires: 1000 * 60 * 5
				}
			}
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
