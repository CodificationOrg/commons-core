"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var cf = require("aws-cloudfront-sign");
var S3Utils_1 = require("./S3Utils");
var CodicomUtils_1 = require("./CodicomUtils");
var CloudFrontUtils = /** @class */ (function () {
    function CloudFrontUtils(privateKeyBucket) {
        this.s3 = new S3Utils_1.S3Utils();
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
        console.log("Creating policy query string params for url [" + url + "] with expiration of: [" + expiration + "]");
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
