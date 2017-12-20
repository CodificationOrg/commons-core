"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerFactory_1 = require("./logging/LoggerFactory");
var Level_1 = require("./logging/Level");
var ScrapingUtils_1 = require("./ScrapingUtils");
describe('ScrapingUtils static content unit tests', function () {
    LoggerFactory_1.LoggerFactory.GLOBAL_LEVEL = Level_1.Level.ALL;
    it('Can find attribute value', function () {
        var rval = ScrapingUtils_1.ScrapingUtils.scrapeAttributeValueFromString('<img src="abc.png" title="Test">', [{ selector: 'img[title^="Test"]', attribute: 'src' }]);
        expect(rval).toBe('abc.png');
    });
});
