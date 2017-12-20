"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CodicomUtils_1 = require("../CodicomUtils");
var BasicLayout = /** @class */ (function () {
    function BasicLayout() {
        this.timestampFormat = 'YYYY-MM-DD HH:mm:ss,SSS';
    }
    BasicLayout.prototype.format = function (event) {
        var optionalParams = event.optionalParams
            ? "" + event.optionalParams
            : '';
        return CodicomUtils_1.CodicomUtils.now().format(this.timestampFormat) + " - " + event.logger.getName() + " - " + event.level.getName() + " - " + event.message + " " + optionalParams;
    };
    return BasicLayout;
}());
exports.BasicLayout = BasicLayout;
