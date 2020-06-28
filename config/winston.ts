let winston = require('winston');
let logger = new (winston.Logger)();

export class WinstonConfiguration {
    static isInitialized: boolean;

    /** Should only be called by root file */
    static initialize() {
        if (this.isInitialized) {
            return logger;
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

        this.isInitialized = true;

        return logger;
    }
}
