import { injectable } from 'inversify';
import { KrossrLogger } from '../app/Logger/KrossrLogger';
import { KrossrLoggerProvider } from '../app/Logger/KrossrLoggerProvider';

let winston = require('winston');
let logger = new (winston.Logger)();

@injectable()
export class WinstonConfiguration implements KrossrLoggerProvider {
    private logger: KrossrLogger;

    getLogger() {
        return this.logger;
    }

    /** Should only be called by root file */
    initialize() {
        if (!!this.getLogger()) {
            throw new Error('this should only be called ONCE!');
        }

        logger.add(winston.transports.Console, {
            level: 'verbose',
            prettyPrint: true,
            colorize: true,
            silent: false,
            timestamp: false,
            verbose: false
        });

        logger.stream = {
            // jshint unused:false
            write(message, encoding){
                logger.info(message);
            }
        };

        this.logger = logger;
    }
}
