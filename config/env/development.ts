'use strict';

import { IEnvironmentConfiguration } from './IEnvironmentConfiguration';

export class DevelopmentEnvironmentConfiguration implements IEnvironmentConfiguration {
    app = {
        title: 'krossr - Development Environment'
    };

    enableSequelizeLog = 'false';

    // forceDbSync = true;

    db = {
        name: 'krossr',
        username: 'rosalyn',
        password: 'postgres123!',
        host: '127.0.0.1',
        port: 5432
    };
}
