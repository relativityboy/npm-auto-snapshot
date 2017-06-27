## npm-auto-snapshot
[![Build Status](https://travis-ci.org/relativityboy/npm-auto-snapshot.svg?branch=master)](https://travis-ci.org/relativityboy/npm-auto-snapshot)
[![Coverage Status](https://coveralls.io/repos/github/relativityboy/npm-auto-snapshot/badge.svg?branch=master)](https://coveralls.io/github/relativityboy/npm-auto-snapshot?branch=master)

This package was inspired by [npm-snapshot](https://www.npmjs.com/package/npm-snapshot) but automates versioning and adds several features, 
including a version check for production builds. 

It's _very_ easy to use.

Unless your build is contained entirely within your js-package I recommend installing
globally for use across multiple projects.

### CLI
There are two cli commands available. Call them in a directory with the relevant package.json file,
or pass the path to the package.json file.

#### \>> npm_update_snapshot

This command updates the current version of a package.json file to x.y.z-SNAPSHOT.<epoch>

##### Intended use 
Run before build publishes development package version to npm.

##### requirements
The package.json's .version property must be of the format /d+\.d+\.d+-SNAPSHOT/
 
##### arguments
When called within the same directory as the package.json file you wish to modify, 
this command needs no arguments.
Alternatively, you may pass a relative or absolute path to the package.json or its directory.

#### \>> npm_check_no_snapshots
This command scans a package.json file for a version or dependencies ending in /-SNAPSHOT(\.\d+)?$/
If any are found it throws an exception.

##### Intended use - 
Run at the start of a build intended to produce production artifacts.

##### requirements
There should be no instances of -SNAPSHOT in any versions within the package.json.

### Within another package
If used within another package, the following functions are exposed. 
They throw exceptions if they encounter errors.

snapshotUpdate:
~~~javascript
NpmSnapshot = require('npm-auto-snapshot');

NpmSnapshot.snapshotUpdate('/path/to/the/package.json', console.log);
~~~

noSnapshotScan
~~~javascript
NpmSnapshot = require('npm-auto-snapshot');

NpmSnapshot.noSnapshotScan('/path/to/the/package.json', console.log);
~~~

