"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Level = /** @class */ (function () {
    function Level(name, priority) {
        this.name = name;
        this.priority = priority;
    }
    Level.toLevel = function (level) {
        var rval;
        if (typeof level === 'number') {
            rval = Level.ALL[level];
        }
        else {
            var filtered = this.ALL_LEVELS.filter(function (lvl) { return lvl.getName() === level.toUpperCase(); });
            rval = filtered.length > 0 ? filtered[0] : undefined;
        }
        return rval;
    };
    Level.prototype.getName = function () {
        return this.name;
    };
    Level.prototype.getPriority = function () {
        return this.priority;
    };
    Level.prototype.isGreaterOrEqual = function (level) {
        return this.priority >= level.priority;
    };
    Level.OFF = new Level('OFF', 0);
    Level.FATAL = new Level('FATAL', 1);
    Level.ERROR = new Level('ERROR', 2);
    Level.WARN = new Level('WARN', 3);
    Level.INFO = new Level('INFO', 4);
    Level.DEBUG = new Level('DEBUG', 5);
    Level.TRACE = new Level('TRACE', 6);
    Level.ALL = new Level('ALL', 7);
    Level.ALL_LEVELS = [
        Level.OFF,
        Level.FATAL,
        Level.ERROR,
        Level.WARN,
        Level.INFO,
        Level.DEBUG,
        Level.TRACE,
        Level.ALL
    ];
    return Level;
}());
exports.Level = Level;
