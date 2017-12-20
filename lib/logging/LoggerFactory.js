"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggingEvent_1 = require("./LoggingEvent");
var CodicomUtils_1 = require("../CodicomUtils");
var Level_1 = require("./Level");
var Appender_1 = require("./Appender");
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
    }
    LoggerFactory.getLogger = function (name) {
        this.init();
        var loggerName = typeof name === 'string' ? name : typeof name;
        var rval = this.LOGGERS[loggerName];
        if (!rval) {
            rval = this.initialize(new DefaultLoggerImpl(loggerName));
            this.LOGGERS[loggerName] = rval;
        }
        return rval;
    };
    LoggerFactory.init = function () {
        if (!this.GLOBAL_LEVEL) {
            this.GLOBAL_LEVEL = Level_1.Level.toLevel(CodicomUtils_1.CodicomUtils.env('LOGGING_LEVEL', 'INFO'));
        }
    };
    LoggerFactory.initialize = function (logger) {
        var levelName = CodicomUtils_1.CodicomUtils.env('LOGGING_LEVEL_' + logger.getName());
        if (levelName.length > 0) {
            logger.setLevel(Level_1.Level.toLevel(levelName));
        }
        return logger;
    };
    LoggerFactory.setLevel = function (logger, level) {
        if (logger instanceof DefaultLoggerImpl) {
            logger.setLevel(level);
        }
        return logger;
    };
    LoggerFactory.setAppender = function (logger, appender) {
        if (logger instanceof DefaultLoggerImpl) {
            logger.setAppender(appender);
        }
        return logger;
    };
    LoggerFactory.LOGGERS = [];
    LoggerFactory.GLOBAL_APPENDER = new Appender_1.ConsoleAppender();
    return LoggerFactory;
}());
exports.LoggerFactory = LoggerFactory;
var DefaultLoggerImpl = /** @class */ (function () {
    function DefaultLoggerImpl(name) {
        this.name = name;
    }
    DefaultLoggerImpl.prototype.getName = function () {
        return this.name;
    };
    DefaultLoggerImpl.prototype.getLevel = function () {
        return !this.level ? LoggerFactory.GLOBAL_LEVEL : this.level;
    };
    DefaultLoggerImpl.prototype.setLevel = function (level) {
        this.level = level;
    };
    DefaultLoggerImpl.prototype.getAppender = function () {
        return !this.appender ? LoggerFactory.GLOBAL_APPENDER : this.appender;
    };
    DefaultLoggerImpl.prototype.setAppender = function (appender) {
        this.appender = appender;
    };
    DefaultLoggerImpl.prototype.fatal = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, [Level_1.Level.FATAL, message].concat(optionalParams));
    };
    DefaultLoggerImpl.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, [Level_1.Level.ERROR, message].concat(optionalParams));
    };
    DefaultLoggerImpl.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, [Level_1.Level.WARN, message].concat(optionalParams));
    };
    DefaultLoggerImpl.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, [Level_1.Level.INFO, message].concat(optionalParams));
    };
    DefaultLoggerImpl.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, [Level_1.Level.DEBUG, message].concat(optionalParams));
    };
    DefaultLoggerImpl.prototype.trace = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        return this.log.apply(this, [Level_1.Level.TRACE, message].concat(optionalParams));
    };
    DefaultLoggerImpl.prototype.log = function (level, message) {
        var optionalParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            optionalParams[_i - 2] = arguments[_i];
        }
        var rval = this.isEnabled(level);
        if (rval) {
            this.getAppender().doAppend(new LoggingEvent_1.LoggingEvent(this, level, message, optionalParams));
        }
        return rval;
    };
    DefaultLoggerImpl.prototype.isEnabled = function (level) {
        return this.getLevel().isGreaterOrEqual(level);
    };
    return DefaultLoggerImpl;
}());
