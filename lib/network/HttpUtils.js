"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var fromPromise_1 = require("rxjs/observable/fromPromise");
var WebRequest = require("web-request");
var LoggerFactory_1 = require("./../logging/LoggerFactory");
var HttpUtils = /** @class */ (function () {
    function HttpUtils() {
    }
    HttpUtils.fetchContentAsString = function (url, maxRetries) {
        var _this = this;
        if (maxRetries === void 0) { maxRetries = 0; }
        this.LOG.trace("Fetching content from [" + url + "], with a maximum of " + maxRetries + " retries.");
        return fromPromise_1.fromPromise(WebRequest.get(url)).pipe(operators_1.map(function (response) {
            if (response.statusCode >= 400) {
                _this.LOG.error("Received error statusCode [" + response.statusCode + "] from [" + url + "]: ", response.content);
                throw 'Failed with status code: ' + response.statusCode;
            }
            else {
                _this.LOG.debug("Received statusCode [" + response.statusCode + "] from [" + url + "] with content: ", response.content);
            }
            return response.content;
        }), operators_1.retry(maxRetries));
    };
    HttpUtils.LOG = LoggerFactory_1.LoggerFactory.getLogger('HttpUtils');
    return HttpUtils;
}());
exports.HttpUtils = HttpUtils;
