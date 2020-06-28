import * as _ from 'lodash';
import { EnvironmentConfigurationDefaults } from './env/all';
import { DevelopmentEnvironmentConfiguration } from './env/development';
import { IEnvironmentConfiguration } from './env/IEnvironmentConfiguration';

/**
 * Load app configurations
 */
export class EnvironmentConfiguration {
    static getConfiguration() {
        return _.extend(
            EnvironmentConfigurationDefaults.getDefaults(),
            EnvironmentConfiguration.getConfig()
        ) as IEnvironmentConfiguration;
    }

    private static getConfig() {
        switch (process.env.NODE_ENV) {
            case 'development':
                return new DevelopmentEnvironmentConfiguration();

            default:
                throw new Error('process.env.NODE_ENV is not a supported environment!');
        }
    }
}
