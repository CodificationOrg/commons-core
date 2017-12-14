import { S3 } from 'aws-sdk';
import { Observable } from 'rxjs';
export declare class S3Utils {
    private s3;
    private dataBucket;
    constructor(dataBucket?: string);
    setDataBucket(bucketName: string): void;
    exists(key: string): Observable<boolean>;
    saveJSON<T>(key: string, obj: T): Observable<boolean>;
    saveText<T>(key: string, obj: T, contentType?: string): Observable<boolean>;
    saveBinary<T>(key: string, obj: T, contentType?: string): Observable<boolean>;
    private save<T>(key, request);
    remove(key: string): Observable<boolean>;
    removeAll(keys: string[]): Observable<boolean>;
    load<T>(key: string, defaultValue?: T): Observable<T>;
    getBody(key: string): Observable<S3.Body>;
    getKeys(prefix: string): Observable<string[]>;
    getObjects(prefix: string): Observable<S3.Object[]>;
}
