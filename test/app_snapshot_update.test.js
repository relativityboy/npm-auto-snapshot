var expect = require("chai").expect;
const fs = require('fs');
const path = require('path');
const App = require('../src/app');

const fnLoadPackage = function(filePath) {
  console.log(filePath)
  return JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}));
};

const fnMakeFilePath = function(fileName) {
  return path.normalize(__dirname + /test_resources/ + fileName);
}

describe('App.snapshotUpdate', function() {
  it("Updates -SNAPSHOT suffixed versions", function() {
    const filePath = fnMakeFilePath('package_version_snapshot_update.json');
    const originalPackage = fnLoadPackage(filePath);
    const updatedVersion = App.snapshotUpdate(filePath);

    expect(updatedVersion).to.not.equal(originalPackage);
    expect(updatedVersion).to.equal(fnLoadPackage(filePath).version);
  });
});