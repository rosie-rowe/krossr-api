var winston = require('winston');
var logger = new (winston.Logger)();

export class WinstonConfiguration {
    initialize() {
        logger.add(winston.transports.Console, {
            level: 'verbose',
            prettyPrint: true,
            colorize: true,
            silent: false,
            timestamp: false,
            verbose: false
        });
        
        logger.stream = {
            //jshint unused:false
            write: function(message, encoding){
                logger.info(message);
            }
        };

        return logger;
    }
}