'use strict';

const Graceful = require('../graceful');

Graceful.on('exit', done => {
    setTimeout(() => {
        process.stdout.write('ok');
        done();
    }, 100)
});

process.emit('SIGTERM');
