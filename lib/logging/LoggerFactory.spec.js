"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory_1 = require("./LoggerFactory");
var Level_1 = require("./Level");
describe('LoggerFactory unit tests', function () {
    var logger;
    beforeEach(function () {
        logger = LoggerFactory_1.LoggerFactory.getLogger('Foo');
        LoggerFactory_1.LoggerFactory.setLevel(logger, Level_1.Level.INFO);
    });
    it('Can create a logger', function () {
        expect(logger.getName()).toBe('Foo');
    });
    it('Will log error messages when enabled', function () {
        expect(logger.error('Test entry')).toBe(true);
    });
    it('Will not log debug messages when disabled', function () {
        expect(logger.debug('Test entry')).toBe(false);
    });
    it('Will respect global log level', function () {
        LoggerFactory_1.LoggerFactory.setLevel(logger, undefined);
        LoggerFactory_1.LoggerFactory.GLOBAL_LEVEL = Level_1.Level.ALL;
        expect(logger.getLevel()).toBe(LoggerFactory_1.LoggerFactory.GLOBAL_LEVEL);
        expect(logger.debug('Test entry')).toBe(true);
    });
});
