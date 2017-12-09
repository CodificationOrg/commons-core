"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = require("aws-sdk");
var rxjs_1 = require("rxjs");
var of_1 = require("rxjs/observable/of");
var operators_1 = require("rxjs/operators");
var CodicomUtils_1 = require("./CodicomUtils");
var S3Utils = /** @class */ (function () {
    function S3Utils(dataBucket) {
        this.s3 = new aws_sdk_1.S3();
        this.dataBucket = !dataBucket
            ? CodicomUtils_1.CodicomUtils.env('DATA_BUCKET_NAME')
            : dataBucket;
    }
    S3Utils.prototype.setDataBucket = function (bucketName) {
        this.dataBucket = bucketName;
    };
    S3Utils.prototype.exists = function (key) {
        var _this = this;
        var request = {
            Bucket: this.dataBucket,
            Key: key
        };
        return rxjs_1.Observable.create(function (observer) {
            _this.s3.headObject(request, function (err, data) {
                if (err) {
                    observer.next(false);
                    if (err.code !== 'Not Found') {
                        console.log("Unexpected error checking for key[" + key + "]: ", err);
                    }
                }
                else {
                    observer.next(true);
                }
                observer.complete();
            });
        });
    };
    S3Utils.prototype.saveJSON = function (key, obj) {
        return this.saveText(key, obj, 'application/json');
    };
    S3Utils.prototype.saveText = function (key, obj, contentType) {
        return this.saveBinary(key, JSON.stringify(obj), contentType);
    };
    S3Utils.prototype.saveBinary = function (key, obj, contentType) {
        var request = {
            Bucket: this.dataBucket,
            Key: key,
            Body: obj,
            ContentType: contentType
        };
        return this.save(key, request);
    };
    S3Utils.prototype.save = function (key, request) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.s3.putObject(request, function (err, data) {
                if (err) {
                    console.log("Failed to store key[" + key + "]: ", err);
                    observer.next(false);
                }
                else {
                    observer.next(true);
                }
                observer.complete();
            });
        });
    };
    S3Utils.prototype.remove = function (key) {
        return this.removeAll([key]);
    };
    S3Utils.prototype.removeAll = function (keys) {
        var _this = this;
        var rval = of_1.of(true);
        if (keys && keys.length > 0) {
            var deleteObjs = [];
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                deleteObjs.push({ Key: key });
            }
            var request_1 = {
                Bucket: this.dataBucket,
                Delete: {
                    Objects: deleteObjs
                }
            };
            rval = rxjs_1.Observable.create(function (observer) {
                _this.s3.deleteObjects(request_1, function (err, data) {
                    if (err) {
                        console.log("Failed to delete: ", err);
                        observer.next(false);
                    }
                    else {
                        observer.next(true);
                    }
                    observer.complete();
                });
            });
        }
        return rval;
    };
    S3Utils.prototype.load = function (key) {
        return this.getBody(key).pipe(operators_1.map(function (body) { return JSON.parse(body.toString()); }));
    };
    S3Utils.prototype.getBody = function (key) {
        var _this = this;
        var request = {
            Bucket: this.dataBucket,
            Key: key
        };
        return rxjs_1.Observable.create(function (observer) {
            _this.s3.getObject(request, function (err, data) {
                if (!err) {
                    observer.next(data.Body);
                    observer.complete();
                }
                else {
                    console.error("Error loading S3 object[" + key + "]: ", err);
                    observer.complete();
                }
            });
        });
    };
    S3Utils.prototype.getKeys = function (prefix) {
        return this.getObjects(prefix).pipe(operators_1.map(function (objs) {
            var rval = [];
            for (var _i = 0, objs_1 = objs; _i < objs_1.length; _i++) {
                var obj = objs_1[_i];
                rval.push(obj.Key);
            }
            return rval;
        }));
    };
    S3Utils.prototype.getObjects = function (prefix) {
        var _this = this;
        var request = {
            Bucket: this.dataBucket,
            Prefix: prefix
        };
        //console.log('Request: ', request);
        return rxjs_1.Observable.create(function (observer) {
            _this.s3.listObjects(request, function (err, data) {
                if (!err) {
                    // console.log('Data: ', data);
                    var rval = [];
                    for (var _i = 0, _a = data.Contents; _i < _a.length; _i++) {
                        var entry = _a[_i];
                        rval.push(entry);
                    }
                    observer.next(rval);
                    observer.complete();
                }
                else {
                    console.log('Error getting existing s3 objects: ', err);
                    observer.complete();
                }
            });
        });
    };
    return S3Utils;
}());
exports.S3Utils = S3Utils;
