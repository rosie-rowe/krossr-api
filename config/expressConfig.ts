'use strict';

import { EnvironmentConfiguration } from './config';
import express from 'express';
import * as passport from 'passport';
import { IKrossrDatabase } from '../app/Database/IKrossrDatabase';
import { injectable, multiInject, inject } from 'inversify';
import { RouteConfiguration } from '../app/Routes/RouteConfiguration';
import { RouteSymbols } from '../app/routes/RouteSymbols';
import { IEnvironmentConfiguration } from './env/IEnvironmentConfiguration';
let morgan = require('morgan');
let bodyParser = require('body-parser');
let session = require('express-session');
let compress = require('compression');
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
let helmet = require('helmet');
let SequelizeStore = require('connect-session-sequelize')(session.Store);
let flash = require('connect-flash');
let consolidate = require('consolidate');
let winston = require('winston');

@injectable()
export class ExpressConfiguration {
    private config: IEnvironmentConfiguration;

    constructor(
        @inject(EnvironmentConfiguration) private environmentConfiguration: EnvironmentConfiguration,
        @multiInject(RouteSymbols.RouteConfiguration) private routeConfigs: RouteConfiguration[],
    ) {
        this.config = this.environmentConfiguration.getConfiguration();
    }

    configure(db: IKrossrDatabase): express.Application {
        winston.info('Intializing Express!');

        // Initialize express app
        let app = express();

        // Passing the request url to environment locals
        app.use((req, res, next) => {
            res.locals.url = req.protocol + '://' + req.headers.host + req.url;
            next();
        });

        // Should be placed before express.static
        app.use(compress({
            filter(req, res) {
                return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
            },
            level: 9
        }));

        // Showing stack errors
        app.set('showStackError', true);

        // Set swig as the template engine
        app.engine('server.view.html', consolidate[this.config.templateEngine]);

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

        this.routeConfigs.forEach(routeConfig => routeConfig.configureRoutes(app));

        // Assume 404 since no middleware responded
        app.use((req, res) => {
            // let Angular handle it
            res.redirect(`/?clientUrl=${req.url}`);
        });

        return app;
    }
}
