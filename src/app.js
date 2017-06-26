const fs = require('fs');
const rSnapshot = /-SNAPSHOT(\.\d+)?$/;

const fnLoadPackage = function(filePath) {
    return JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}));
};

/**
 * @param str
 * @returns {*} - everything before -SNAPSHOT if true. false otherwise.
 */
const fnEndsWithSnapshot = function(str) {
    if(null === str.toUpperCase().match(rSnapshot)) {
        return false;
    }
    return str.toUpperCase().replace(rSnapshot, '');
}

exports.snapshotUpdate = function(filePath, log) {
    const package = fnLoadPackage((filePath));
    const version = fnEndsWithSnapshot(package.version);
    if(!version) {
        throw new Error("Please suffix your semver with -SNAPSHOT");
    }
    if (null === version.match(/^\d+\.\d+\.\d+$/)) {
        throw new Error("Invalid semver in package.");
    }

    package.version = version + '-SNAPSHOT.' + Date.now();

    fs.writeFile(filePath, JSON.stringify(package, null, 2));

    log("Updated package version to: " + package.version);
};

exports.noSnapshotScan = function(filePath, log) {
    const package = fnLoadPackage(filePath);
    const errors = [];
    var i;
    if(null !== package.version.toUpperCase().match(rSnapshot)) {
        errors.push("package.version!!!! " + package.version);
    }
    if(package.dependencies) {
        for(i in package.dependencies) if(package.dependencies.hasOwnProperty(i)) {
            if(fnEndsWithSnapshot(package.dependencies[i])) {
                errors.push("dependencies." + i + " " + package.dependencies[i] );
            }
        }
    }

    if(package.devDependencies) {
        for(i in package.devDependencies) if(package.devDependencies.hasOwnProperty(i)) {
            if(fnEndsWithSnapshot(package.devDependencies[i])) {
                errors.push("dependencies." + i + " " + package.devDependencies[i] );
            }
        }
    }
    if(errors.length > 0) {
        log("***Snapshot Dependencies found:")
        for(i = 0; i < errors.length; i++) {
            log(errors[i]);
        }
        log("***");
        throw new Error("Snapshot Dependencies found!");
    }
    log("No snapshots found. (Checked version, dependencies, devDependencies)");
}
