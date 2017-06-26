#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const app = require('../src/app');

var filePath = process.cwd()
console.log(process.argv.length)
if (process.argv.length >= 3) {
    if ('/' !== process.argv[2][0]) {
        filePath = filePath + '/' + process.argv[2];
    } else {
        filePath = process.argv[2];
    }
}

if (null === filePath.match(/\/package\.json$/)) {
    filePath = filePath + '/package.json';
}

filePath = path.normalize(filePath);

if (!fs.existsSync(filePath)) {
    throw new Error("Could not find target file: " + filePath);
}

app.noSnapshotScan(filePath, function(str) {
    console.log('npm_no_snapshots: ' + str);
});