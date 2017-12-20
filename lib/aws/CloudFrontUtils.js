"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var cf = require("aws-cloudfront-sign");
var S3Bucket_1 = require("./S3Bucket");
var CodicomUtils_1 = require("../CodicomUtils");
var LoggerFactory_1 = require("../logging/LoggerFactory");
var CloudFrontUtils = /** @class */ (function () {
    function CloudFrontUtils(privateKeyBucket) {
        this.LOG = LoggerFactory_1.LoggerFactory.getLogger('CloudFrontUtils');
        this.s3 = new S3Bucket_1.S3Bucket();
        if (privateKeyBucket) {
            this.s3.setDataBucket(privateKeyBucket);
        }
        else {
            this.s3.setDataBucket(CodicomUtils_1.CodicomUtils.env(CloudFrontUtils.ENV_BUCKET));
        }
        this.keyPairId = CodicomUtils_1.CodicomUtils.env(CloudFrontUtils.ENV_KEY_PAIR_ID);
    }
    CloudFrontUtils.prototype.setKeyPairId = function (keyPairId) {
        this.keyPairId = keyPairId;
    };
    CloudFrontUtils.prototype.setPrivateKey = function (privateKey) {
        this.privateKey = privateKey;
    };
    CloudFrontUtils.prototype.generateSignedQueryParams = function (url, expiration) {
        var _this = this;
        return this.getPrivateKey().pipe(operators_1.map(function (pk) {
            return _this.toSignedQueryParams(url, pk, expiration);
        }));
    };
    CloudFrontUtils.prototype.getPrivateKey = function () {
        var rval;
        if (this.privateKey) {
            rval = rxjs_1.Observable.of(this.privateKey);
        }
        else {
            rval = this.s3
                .getBody(this.getPrivateKeyObjectId())
                .pipe(operators_1.map(function (data) { return data.toString(); }));
        }
        return rval;
    };
    CloudFrontUtils.prototype.getPrivateKeyObjectId = function () {
        return "cloudfront/pk-" + this.keyPairId + ".pem";
    };
    CloudFrontUtils.prototype.toSignedQueryParams = function (url, privateKey, expiration) {
        this.LOG.debug("Creating policy query string params for url [" + url + "] with expiration of: [" + expiration + "]");
        var rval = cf.getSignedUrl(url, this.toOpts(privateKey, expiration));
        return rval.substring(rval.indexOf('Policy='));
    };
    CloudFrontUtils.prototype.toOpts = function (privateKey, expiration) {
        var rval = { keypairId: this.keyPairId, privateKeyString: privateKey };
        if (expiration) {
            rval['expireTime'] = expiration;
        }
        return rval;
    };
    CloudFrontUtils.ENV_BUCKET = 'KEY_BUCKET_NAME';
    CloudFrontUtils.ENV_KEY_PAIR_ID = 'KEY_PAIR_ID';
    return CloudFrontUtils;
}());
exports.CloudFrontUtils = CloudFrontUtils;
