'use strict';

const Graceful = require('../graceful');

Graceful.timeout = 1000;

Graceful.on('exit', done => {
    setTimeout(() => {
        process.stdout.write('not-supposed-to-run');
        done();
    }, 2000);
});

Graceful.exit();