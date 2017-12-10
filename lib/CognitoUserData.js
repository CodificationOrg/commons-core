"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JWT = require("jwt-decode");
var CognitoUserData = /** @class */ (function () {
    function CognitoUserData(jwtToken) {
        this.token = JWT(jwtToken);
    }
    CognitoUserData.prototype.name = function () {
        return this.token['name'];
    };
    CognitoUserData.prototype.username = function () {
        return this.token['cognito:username'];
    };
    CognitoUserData.prototype.email = function () {
        return this.token['email'];
    };
    CognitoUserData.prototype.isMember = function (group) {
        return this.groups().filter(function (g) { return g == group; }).length == 1;
    };
    CognitoUserData.prototype.groups = function () {
        return this.token['cognito:groups'];
    };
    return CognitoUserData;
}());
exports.CognitoUserData = CognitoUserData;
