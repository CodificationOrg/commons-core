import { Moment } from 'moment';
import * as moment from 'moment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as cf from 'aws-cloudfront-sign';
import { SignatureOptions } from 'aws-cloudfront-sign';

import { S3Bucket } from './S3Bucket';
import { CodicomUtils } from '../CodicomUtils';
import { LoggerFactory } from '../logging/LoggerFactory';

export class CloudFrontUtils {
  private LOG = LoggerFactory.getLogger('CloudFrontUtils');

  public static ENV_BUCKET = 'KEY_BUCKET_NAME';
  public static ENV_KEY_PAIR_ID = 'KEY_PAIR_ID';

  private s3: S3Bucket = new S3Bucket();
  private keyPairId: string;
  private privateKey: string;

  private expiration: Moment;

  constructor(privateKeyBucket?: string) {
    if (privateKeyBucket) {
      this.s3.setDataBucket(privateKeyBucket);
    } else {
      this.s3.setDataBucket(CodicomUtils.env(CloudFrontUtils.ENV_BUCKET));
    }
    this.keyPairId = CodicomUtils.env(CloudFrontUtils.ENV_KEY_PAIR_ID);
  }

  public setKeyPairId(keyPairId: string): void {
    this.keyPairId = keyPairId;
  }

  public setPrivateKey(privateKey: string): void {
    this.privateKey = privateKey;
  }

  public generateSignedQueryParams(
    url: string,
    expiration?: Moment
  ): Observable<string> {
    return this.getPrivateKey().pipe(
      map(pk => {
        return this.toSignedQueryParams(url, pk, expiration);
      })
    );
  }

  private getPrivateKey(): Observable<string> {
    let rval: Observable<string>;
    if (this.privateKey) {
      rval = Observable.of(this.privateKey);
    } else {
      rval = this.s3
        .getBody(this.getPrivateKeyObjectId())
        .pipe(map(data => data.toString()));
    }
    return rval;
  }

  private getPrivateKeyObjectId(): string {
    return `cloudfront/pk-${this.keyPairId}.pem`;
  }

  private toSignedQueryParams(
    url: string,
    privateKey: string,
    expiration?: Moment
  ): string {
    this.LOG.debug(
      `Creating policy query string params for url [${url}] with expiration of: [${expiration}]`
    );
    const rval = cf.getSignedUrl(url, this.toOpts(privateKey, expiration));
    return rval.substring(rval.indexOf('Policy='));
  }

  private toOpts(privateKey: string, expiration?: Moment): SignatureOptions {
    const rval = { keypairId: this.keyPairId, privateKeyString: privateKey };
    if (expiration) {
      rval['expireTime'] = expiration;
    }
    return rval;
  }
}
