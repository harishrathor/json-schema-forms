import './paths'; //Must be called first
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
const MongoStore = require('connect-mongo')(session);



export default class RootServer {
    
	constructor() {
		this._initialize();
	}

	preInit() {}

	_initialize() { // Will always be overridden.
        this.preInit();

        this.ENV = process.env.NODE_ENV;
		this.APP = null;
        
		this._serverRunning = false;
		this._dbConnectionPromise = null;
        this._httpServer = null;
        this._dbLoadPromise = null;
        
        this.initialize();
		this.postInit();
    }
    
    initialize() { //Must be overridden by child class.
        this.db = null;
        this.logger = null;
        this.requestHanlder = null;
		this.sessionConfig = null;
        this.paths = null;
		this.clientsConfig = null;
    }

	postInit() {
		this._createApp();
		this._createRouter();
		this._loadDatabase();
		this._makeDBConnection();
		this._loadRoutes();
        this._registerMiddlewares();
        this._setupSession();
        this.startServer();
	}

	_createApp() {
		this.app = express();
	}

	_createRouter() {
		this.router = express.Router();
	}

	_loadDatabase() {
        require('@db');
      //  this._dbLoadPromise = import('@db');
       // this._dbLoadPromise.then(this._makeDBConnection.bind(this), e => console.log(e));
	}

	_makeDBConnection() {
        this._dbConnectionPromise = this.db.makeConnection();
       // this._dbConnectionPromise.then(this._setupSession.bind(this), e => console.log(e));
	}
	
	_loadRoutes() {
		require("@routes"); 
	}

	_setupSession() {
		this._dbConnectionPromise
		.then(() => {
			this.sessionConfig.store = new MongoStore({ db: this.DB.getConnection(this.MASTER_CLIENT_NAME) });

			app
			.use(session(this.sessionConfig))
			.use(Router);
			startServer();
		}).catch(err => {
			this.logger.logInfo('Error in session configuration.').logError(err);
			startServer();
		});
	}

    isDev() {
        return this.ENV === 'development';
    }

    isProd() {
        return this.ENV === 'production';
    }

    isStaging() {
        return this.ENV === 'staging';
    }

	_registerMiddlewares() {
		let app = this.app;		
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		app.use(cookieParser());
		app.use(compress());
		app.use(methodOverride());

		// secure apps by setting various HTTP headers
		app.use(helmet());

		// enable CORS - Cross Origin Resource Sharing
		app.use(cors());

		app.use(express.static(this.paths.CLIENT_ROOT));
		app.use(express.static(this.paths.STATIC_FILES));

		app.set('masterClientName', this.MASTER_CLIENT_NAME);

		//app.use(vhost(CLIENT_INFO.));

		if (this.isDev()) {
			app.use(logger('dev'));
		}
	}

	startServer() {
		if (!this.serverRunning) {
			const PORT = process.env.PORT || 5000;		
			this._httpServer = this.app.listen(PORT, err => {
				if (err) {
					console.log("Error in running web server.", err);
				} else {
					console.log(`Web(${this.ENV}) Server running at port ${PORT}.`);
					this._serverRunning = true;
					this._registerClients();
				}
			});
			//console.log('httpServerInstance', httpServerInstance);
		}
	}

	_registerClients() {
		for (let clientUrl in this.CLIENTS_URL_MAPPING) {
			app.use(vhost(clientUrl, function (req, res) {
				// handle req + res belonging to api.example.com
				// pass the request to a standard Node.js HTTP server
				this.__httpServer.emit('request', req, res);
			}));
		}
    }
    
    static getServerObject(requestHanlder) {
        return {
            ROUTER          : RootServer.ROUTER,
            CONSTANTS       : RootServer.CONSTANTS,
            REQUEST_HANDLER : requestHanlder
        };
    }
/* 
    static createServer(serverObject) {
        var classname = this.toString().split ('(' || /s+/)[0].split (' ' || /s+/)[1];
        console.log('classname', classname);
        Object.assign(serverObject, new classname);
    } */

	get MASTER_CLIENT_NAME() {
		return this.clientsConfig.MASTER_CLIENT_NAME;
	}

	get CLIENTS_URL_MAPPING() {
		return this.clientsConfig.CLIENTS_URL_MAPPING;
    }
    
    get serverRunning() {
        return this._serverRunning;
    }

    static get ROUTER() {
        return express.Router();
    }

    static get CONSTANTS() {
        return { API_ROUTE_PREFIX: "/api" };
    }
}