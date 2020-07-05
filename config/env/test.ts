'use strict';

module.exports = {
    db: {
        name: 'krossr-test',
        username: 'rosalyn',
        password: 'postgres123!',
        host: 'localhost'
    },
    // FORCE_DB_SYNC: 'true',
    port: 3001,
    app: {
        title: 'krossr - Test Environment'
    },
    mailer: {
        from: process.env.MAILER_FROM || 'MAILER_FROM'
    }
};
