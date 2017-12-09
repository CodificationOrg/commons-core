"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment-timezone");
var crypto = require("crypto");
var CodicomUtils = /** @class */ (function () {
    function CodicomUtils() {
    }
    CodicomUtils.isProd = function () {
        return this.env(this.ENV_STAGE, this.STAGE_DEV) == this.STAGE_PROD;
    };
    CodicomUtils.corsHeaders = function (origin, headers, methods) {
        if (origin === void 0) { origin = '*.codification.org'; }
        if (headers === void 0) { headers = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'; }
        if (methods === void 0) { methods = 'POST,OPTIONS,GET,PUT,PATCH,DELETE'; }
        return {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Headers': headers,
            'Access-Control-Allow-Methods': methods
        };
    };
    CodicomUtils.env = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ''; }
        var rval = process.env[key];
        if (rval == null) {
            rval = defaultValue;
            console.warn("Environment variable [" + key + "] not found, returning default value.");
        }
        return rval;
    };
    CodicomUtils.daysBeforeToday = function (days) {
        return this.today().subtract(days, this.DATE_UNIT);
    };
    CodicomUtils.daysFromToday = function (days) {
        return this.today().add(days, this.DATE_UNIT);
    };
    CodicomUtils.today = function () {
        return this.now()
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0);
    };
    CodicomUtils.now = function () {
        return moment.tz(this.TIME_ZONE);
    };
    CodicomUtils.toMd5Hex = function (value) {
        return crypto
            .createHash('md5')
            .update(value)
            .digest('hex');
    };
    CodicomUtils.ENV_STAGE = 'STAGE';
    CodicomUtils.STAGE_DEV = 'dev';
    CodicomUtils.STAGE_PROD = 'prod';
    CodicomUtils.DATE_UNIT = 'days';
    CodicomUtils.TIME_ZONE = 'America/Los_Angeles';
    return CodicomUtils;
}());
exports.CodicomUtils = CodicomUtils;
