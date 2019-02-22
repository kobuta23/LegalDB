'use strict';

const Graceful = require('../graceful');

let handler = done => {
    process.stdout.write('should-not-run');
    done()
};

Graceful.on('exit', handler);
Graceful.off('exit', handler);

let removeListener = Graceful.on('exit', handler.bind(null));
removeListener();

Graceful.exit();