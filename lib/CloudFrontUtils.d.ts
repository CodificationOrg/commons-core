import { Moment } from 'moment';
import { Observable } from 'rxjs';
export declare class CloudFrontUtils {
    static ENV_BUCKET: string;
    static ENV_KEY_PAIR_ID: string;
    private s3;
    private keyPairId;
    private privateKey;
    private expiration;
    constructor(privateKeyBucket?: string);
    setKeyPairId(keyPairId: string): void;
    setPrivateKey(privateKey: string): void;
    generateSignedQueryParams(url: string, expiration?: Moment): Observable<string>;
    private getPrivateKey();
    private getPrivateKeyObjectId();
    private toSignedQueryParams(url, privateKey, expiration?);
    private toOpts(privateKey, expiration?);
}
