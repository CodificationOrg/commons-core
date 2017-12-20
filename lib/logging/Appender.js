"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Layout_1 = require("./Layout");
var ConsoleAppender = /** @class */ (function () {
    function ConsoleAppender(name, layout) {
        if (name === void 0) { name = 'console'; }
        if (layout === void 0) { layout = new Layout_1.BasicLayout(); }
        this.name = name;
        this.layout = layout;
    }
    ConsoleAppender.prototype.doAppend = function (event) {
        console.log(this.layout.format(event));
    };
    return ConsoleAppender;
}());
exports.ConsoleAppender = ConsoleAppender;
