"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JWT = require("jwt-decode");
var CognitoUtils = /** @class */ (function () {
    function CognitoUtils() {
    }
    CognitoUtils.toUserData = function (authorizationHeaderValue) {
        return new CognitoUserData(authorizationHeaderValue);
    };
    return CognitoUtils;
}());
exports.CognitoUtils = CognitoUtils;
var CognitoUserData = /** @class */ (function () {
    function CognitoUserData(jwtToken) {
        this.token = JWT(jwtToken);
    }
    CognitoUserData.prototype.getName = function () {
        return this.token['name'];
    };
    CognitoUserData.prototype.getUsername = function () {
        return this.token['cognito:username'];
    };
    CognitoUserData.prototype.getEmail = function () {
        return this.token['email'];
    };
    CognitoUserData.prototype.isMemberOfAny = function () {
        var groups = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            groups[_i] = arguments[_i];
        }
        return this.toFilteredGroups.apply(this, groups).length > 0;
    };
    CognitoUserData.prototype.isMemberOfAll = function () {
        var groups = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            groups[_i] = arguments[_i];
        }
        return this.toFilteredGroups.apply(this, groups).length == groups.length;
    };
    CognitoUserData.prototype.toFilteredGroups = function () {
        var groups = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            groups[_i] = arguments[_i];
        }
        return this.getGroups().filter(function (g) { return groups.indexOf(g) > -1; });
    };
    CognitoUserData.prototype.getGroups = function () {
        return this.token['cognito:groups'];
    };
    return CognitoUserData;
}());
