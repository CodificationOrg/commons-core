"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cheerio = require("cheerio");
var operators_1 = require("rxjs/operators");
var HttpUtils_1 = require("./network/HttpUtils");
var LoggerFactory_1 = require("./logging/LoggerFactory");
var ScrapingUtils = /** @class */ (function () {
    function ScrapingUtils() {
    }
    ScrapingUtils.scrapeAttributeValueFromURL = function (url, selectors, maxRetries) {
        var _this = this;
        return HttpUtils_1.HttpUtils.fetchContentAsString(url, maxRetries ? maxRetries : 0).pipe(operators_1.map(function (pageContent) {
            return _this.scrapeAttributeValueFromString(pageContent, selectors);
        }));
    };
    ScrapingUtils.scrapeAttributeValueFromString = function (pageContent, selectors) {
        this.LOG.trace('Starting scrape on content: ', pageContent);
        var rval;
        var html = Cheerio.load(pageContent);
        for (var _i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
            var sel = selectors_1[_i];
            if (html(sel.selector).length > 0 &&
                html(sel.selector).attr(sel.attribute).length > 0) {
                rval = html(sel.selector).attr(sel.attribute);
                this.LOG.trace("Attribute value [" + rval + "] found in content: ", pageContent);
                break;
            }
        }
        if (!rval) {
            this.LOG.warn('Failed to find attribute value: ', pageContent, selectors);
        }
        return rval;
    };
    ScrapingUtils.LOG = LoggerFactory_1.LoggerFactory.getLogger('ScrapingUtils');
    return ScrapingUtils;
}());
exports.ScrapingUtils = ScrapingUtils;
