'use strict';

import { EnvironmentConfiguration } from './config';
import * as express from 'express';
import * as passport from 'passport';
import { UsersRoutes } from '../app/routes/UsersRoutes';
import { IKrossrDatabase } from '../app/database/IKrossrDatabase';
import { LevelsRoutes } from '../app/routes/LevelsRoutes';
let config = EnvironmentConfiguration.getConfiguration();

/**
 * Module dependencies.
 */
var morgan = require('morgan'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	SequelizeStore = require('connect-session-sequelize')(session.Store),
	flash = require('connect-flash'),
	consolidate = require('consolidate'),
	winston = require('winston');

export class ExpressConfiguration {
	static configure(db: IKrossrDatabase): express.Application {
		winston.info('Intializing Express!');

		// Initialize express app
		var app = express();
	
		// Setting application local variables
		app.locals.themeColor = '#008287'; // same as @selectedColor in css
		app.locals.title = config.app.title;
		app.locals.description = config.app.description;
		app.locals.keywords = config.app.keywords;
	
		// Passing the request url to environment locals
		app.use(function(req, res, next) {
			res.locals.url = req.protocol + '://' + req.headers.host + req.url;
			next();
		});
	
		// Should be placed before express.static
		app.use(compress({
			filter: function(req, res) {
				return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
			},
			level: 9
		}));
	
		// Showing stack errors
		app.set('showStackError', true);
	
		// Set swig as the template engine
		app.engine('server.view.html', consolidate[config.templateEngine]);
	
		// Set views path and view engine
		app.set('view engine', 'server.view.html');
		app.set('views', './app/views');
	
		// Environment dependent middleware
		if (process.env.NODE_ENV === 'development') {
			// Enable logger (morgan)
			app.use(morgan('dev'));
	
			// Disable views cache
			app.set('view cache', false);
		} else if (process.env.NODE_ENV === 'production') {
			app.locals.cache = 'memory';
		}
	
		// Request body parsing middleware should be above methodOverride
		app.use(bodyParser.urlencoded({
			extended: true
		}));
		app.use(bodyParser.json());
		app.use(methodOverride());
	
		// Enable jsonp
		app.enable('jsonp callback');
	
		// CookieParser should be above session
		app.use(cookieParser());
	
		winston.info('Trying to set up sessions...');
	
		// Postgres Sessions
		app.use(session({
			store: new SequelizeStore({ db: db.sequelize }),
			secret: process.env.SESSION_SECRET,
			resave: false,
			cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
			saveUninitialized: true
		}));
	
		winston.info('...done');
	
		// use passport session
		app.use(passport.initialize());
		app.use(passport.session());
	
		// connect flash for flash messages
		app.use(flash());
	
		// Use helmet to secure Express headers
		app.use(helmet.xframe());
		app.use(helmet.xssFilter());
		app.use(helmet.nosniff());
		app.use(helmet.ienoopen());
		app.disable('x-powered-by');
	
		LevelsRoutes.configureRoutes(app, db);
		UsersRoutes.configureRoutes(app, db);
	
		// Assume 404 since no middleware responded
		app.use(function(req, res) {
			// let Angular handle it
			// this needs to maintain the route, TODO
			res.redirect('/');
		});
	
		return app;
	}
}