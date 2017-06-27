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

describe('App.noSnapshotScan', function() {
  it("returns true if no -SNAPSHOT version/deps/devDeps found", function() {
    const filePath = fnMakeFilePath('package_no_snapshots.json');
    expect(App.noSnapshotScan(filePath)).to.equal(true);
  });
  it("throws and error  if -SNAPSHOT is detected in version", function() {
    const filePath = fnMakeFilePath('package_version_snapshot.json');
    expect(function() { App.noSnapshotScan(filePath)}).to.throw("Snapshot Dependencies found!");
  });
  it("throws and error  if -SNAPSHOT is detected in dependencies", function() {
    const filePath = fnMakeFilePath('package_dependency_snapshot.json');
    expect(function() { App.noSnapshotScan(filePath)}).to.throw("Snapshot Dependencies found!");
  });
  it("throws and error  if -SNAPSHOT is detected in devDependencies", function() {
    const filePath = fnMakeFilePath('package_dev_dependency_snapshot.json');
    expect(function() { App.noSnapshotScan(filePath)}).to.throw("Snapshot Dependencies found!");
  });

});