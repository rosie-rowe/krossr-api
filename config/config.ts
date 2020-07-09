import * as _ from 'lodash';
import { EnvironmentConfigurationDefaults } from './env/all';
import { DevelopmentEnvironmentConfiguration } from './env/development';
import { IEnvironmentConfiguration } from './env/IEnvironmentConfiguration';
import { injectable, inject } from 'inversify';

/**
 * Load app configurations
 */
@injectable()
export class EnvironmentConfiguration {
    constructor(
        @inject(EnvironmentConfigurationDefaults) private environmentConfigurationDefaults: EnvironmentConfigurationDefaults
    ) {

    }

    getConfiguration() {
        return _.extend(
            this.environmentConfigurationDefaults.getDefaults(),
            this.getConfig()
        ) as IEnvironmentConfiguration;
    }

    private getConfig() {
        switch (process.env.NODE_ENV) {
            case 'development':
                return new DevelopmentEnvironmentConfiguration();

            default:
                throw new Error('process.env.NODE_ENV is not a supported environment!');
        }
    }
}
