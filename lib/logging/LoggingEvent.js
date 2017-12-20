"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggingEvent = /** @class */ (function () {
    function LoggingEvent(logger, level, message) {
        var optionalParams = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            optionalParams[_i - 3] = arguments[_i];
        }
        this.logger = logger;
        this.level = level;
        this.message = message;
        if (optionalParams && optionalParams.length > 0) {
            this.optionalParams = optionalParams;
        }
    }
    return LoggingEvent;
}());
exports.LoggingEvent = LoggingEvent;
