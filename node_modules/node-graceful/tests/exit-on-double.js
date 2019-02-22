'use strict';

const Graceful = require('../graceful');

Graceful.on('exit', done => {
    setTimeout(() => {
        process.stdout.write('should-not-run');
        done();
    }, 1000)
});


Graceful.exit('SIGBREAK');

setTimeout(() => Graceful.exit('SIGBREAK'), 500);
