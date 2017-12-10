"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CognitoUserData_1 = require("./CognitoUserData");
var CognitoUserData_2 = require("./CognitoUserData");
exports.CognitoUserData = CognitoUserData_2.CognitoUserData;
var LambdaUtils = /** @class */ (function () {
    function LambdaUtils() {
    }
    LambdaUtils.toCognitoUserData = function (event) {
        return new CognitoUserData_1.CognitoUserData(this.findJWTToken(event));
    };
    LambdaUtils.findJWTToken = function (event) {
        return event.headers['Authorization'];
    };
    return LambdaUtils;
}());
exports.LambdaUtils = LambdaUtils;
