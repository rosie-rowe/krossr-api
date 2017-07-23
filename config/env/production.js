'use strict';

module.exports = {
	db: {
        name: 'krossr',
        username: 'postgres',
        password: process.env.PG_PWD
    },
	port: process.env.PORT || 3000,
	idappr: process.env.SERVER_ADDR || '127.0.0.1',
	assets: {
        lib: {
            css: [],
            js: ['public/dist/lib.min.js']
        },
		css: 'public/dist/application.min.css',
		js: 'public/dist/krossr.js',
        typescript: 'public/dist/typescript.min.js'
	}
};