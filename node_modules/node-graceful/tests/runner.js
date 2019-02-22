'use strict';

// this is a small testing script to avoid heavy external testing dependencies

const execFile = require('child_process').execFile;

let tests = [
    {
        name: "Async wait",
        child: './async-exit',
        expectedOutput: 'ok',
        expectedExitCode: 0
    },
    {
        name: "Multiple listeners",
        child: './multiple-listeners',
        expectedOutput: 'ok',
        expectedExitCode: 0
    },
    {
        name: "Forced exit",
        child: './forced-exit',
        expectedOutput: '',
        expectedExitCode: 1
    },
    {
        name: "Self triggered",
        child: './self-triggered',
        expectedOutput: 'ok',
        expectedExitCode: 0
    },
    {
        name: "Clear listeners",
        child: './clear-listeners',
        expectedOutput: '',
        expectedExitCode: 0
    },
    {
        name: "Exit on double",
        child: './exit-on-double',
        expectedOutput: '',
        expectedExitCode: 1
    }
];

let total = tests.length;
let count = 0;
let success = 0;

function asyncRunner() {
    let test = tests.shift();
    if (!test) {
        if (success < total) {
            console.log(`Has ${total - success} errors!`);
            process.exit(1);
        }
        else {
            console.log('Success!');
            process.exit(0);
        }
    }

    count++;

    let path = require.resolve(__dirname + '/' + test.child);
    let child = execFile('node', [path], (err, stdout) => {
        if (err && /Error/.test(err.message)) {
            console.error(`[${count}/${total}] [ERROR] ${test.name}: Failed with error\n`,
                err.message,
                '\n---------------------------------------------------'
            );
        }
        else if (stdout !== test.expectedOutput) {
            console.error(`[${count}/${total}] [ERROR] ${test.name}: Wrong output. expected '${test.expectedOutput}' got '${stdout
                                                                                                                            || ''}'`);
        }
        else if (child.exitCode !== test.expectedExitCode) {
            console.error(`[${count}/${total}] [ERROR] ${test.name}: Wrong exit code. expected ${test.expectedExitCode} got ${child.exitCode}`);
        }
        else {
            success++;
            console.log(`[${count}/${total}] [OK] ${test.name}`);
        }

        asyncRunner();
    });
}

asyncRunner();
