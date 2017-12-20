"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = require("aws-sdk");
var rxjs_1 = require("rxjs");
var of_1 = require("rxjs/observable/of");
var operators_1 = require("rxjs/operators");
var defaultIfEmpty_1 = require("rxjs/operators/defaultIfEmpty");
var CodicomUtils_1 = require("../CodicomUtils");
var LoggerFactory_1 = require("../logging/LoggerFactory");
var S3Bucket = /** @class */ (function () {
    function S3Bucket(dataBucket) {
        this.LOG = LoggerFactory_1.LoggerFactory.getLogger('S3Bucket');
        this.s3 = new aws_sdk_1.S3();
        this.dataBucket = !dataBucket
            ? CodicomUtils_1.CodicomUtils.env('DATA_BUCKET_NAME')
            : dataBucket;
    }
    S3Bucket.prototype.setDataBucket = function (bucketName) {
        this.dataBucket = bucketName;
    };
    S3Bucket.prototype.exists = function (key) {
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
                        _this.LOG.error("Unexpected error checking for key[" + key + "]: ", err);
                    }
                }
                else {
                    observer.next(true);
                }
                observer.complete();
            });
        });
    };
    S3Bucket.prototype.saveJSON = function (key, obj) {
        return this.saveText(key, obj, 'application/json');
    };
    S3Bucket.prototype.saveText = function (key, obj, contentType) {
        return this.saveBinary(key, JSON.stringify(obj), contentType);
    };
    S3Bucket.prototype.saveBinary = function (key, obj, contentType) {
        var request = {
            Bucket: this.dataBucket,
            Key: key,
            Body: obj,
            ContentType: contentType
        };
        return this.save(key, request);
    };
    S3Bucket.prototype.save = function (key, request) {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.s3.putObject(request, function (err, data) {
                if (err) {
                    _this.LOG.error("Failed to store key[" + key + "]: ", err);
                    observer.next(false);
                }
                else {
                    observer.next(true);
                }
                observer.complete();
            });
        });
    };
    S3Bucket.prototype.remove = function (key) {
        return this.removeAll([key]);
    };
    S3Bucket.prototype.removeAll = function (keys) {
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
                        _this.LOG.error("Failed to delete: ", err);
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
    S3Bucket.prototype.load = function (key, defaultValue) {
        return this.getBody(key).pipe(operators_1.map(function (body) { return JSON.parse(body.toString()); }), defaultIfEmpty_1.defaultIfEmpty(defaultValue));
    };
    S3Bucket.prototype.getBody = function (key) {
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
                    _this.LOG.error("Error loading S3 object[" + key + "]: ", err);
                    observer.complete();
                }
            });
        });
    };
    S3Bucket.prototype.getKeys = function (prefix) {
        return this.getObjects(prefix).pipe(operators_1.map(function (objs) {
            var rval = [];
            for (var _i = 0, objs_1 = objs; _i < objs_1.length; _i++) {
                var obj = objs_1[_i];
                rval.push(obj.Key);
            }
            return rval;
        }));
    };
    S3Bucket.prototype.getObjects = function (prefix) {
        var _this = this;
        var request = {
            Bucket: this.dataBucket,
            Prefix: prefix
        };
        this.LOG.trace('Sending S3 listObjects request: ', request);
        return rxjs_1.Observable.create(function (observer) {
            _this.s3.listObjects(request, function (err, data) {
                if (!err) {
                    _this.LOG.trace('S3 listObjects response: ', data);
                    var rval = [];
                    for (var _i = 0, _a = data.Contents; _i < _a.length; _i++) {
                        var entry = _a[_i];
                        rval.push(entry);
                    }
                    observer.next(rval);
                    observer.complete();
                }
                else {
                    _this.LOG.error('Error getting existing s3 objects: ', err);
                    observer.complete();
                }
            });
        });
    };
    return S3Bucket;
}());
exports.S3Bucket = S3Bucket;
