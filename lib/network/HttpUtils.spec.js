"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUtils_1 = require("./HttpUtils");
var Level_1 = require("./../logging/Level");
var LoggerFactory_1 = require("../logging/LoggerFactory");
describe('HttpUtils success unit tests', function () {
    LoggerFactory_1.LoggerFactory.GLOBAL_LEVEL = Level_1.Level.ALL;
    var result;
    beforeEach(function (done) {
        HttpUtils_1.HttpUtils.fetchContentAsString('http://httpstat.us/200').subscribe(function (response) {
            result = response;
        }, null, function () { return done(); });
    });
    it('Can fetch string content', function () {
        expect(result).toBeDefined();
    });
});
describe('HttpUtils failure unit tests', function () {
    LoggerFactory_1.LoggerFactory.GLOBAL_LEVEL = Level_1.Level.ALL;
    var error;
    beforeEach(function (done) {
        HttpUtils_1.HttpUtils.fetchContentAsString('http://httpstat.us/404', 2).subscribe(null, function (err) {
            error = err;
            done();
        }, function () { return done(); });
    });
    it('Will return an error', function () {
        expect(error).toBeDefined();
    });
});
