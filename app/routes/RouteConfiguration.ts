import * as express from 'express';

export interface RouteConfiguration {
    configureRoutes(app: express.Application);
}
