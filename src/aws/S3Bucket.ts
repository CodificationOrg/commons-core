import {
  ListObjectsRequest,
  GetObjectRequest,
  GetObjectOutput,
  PutObjectRequest,
  PutObjectOutput,
  DeleteObjectsRequest,
  ObjectIdentifier,
  DeleteObjectsOutput,
  HeadObjectRequest,
  HeadObjectOutput
} from 'aws-sdk/clients/s3';
import { S3, AWSError } from 'aws-sdk';

import { Observable, Observer } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { defaultIfEmpty } from 'rxjs/operators/defaultIfEmpty';

import { CodicomUtils } from '../CodicomUtils';
import { LoggerFactory } from '../logging/LoggerFactory';

export class S3Bucket {
  private LOG = LoggerFactory.getLogger('S3Bucket');

  private s3: S3 = new S3();
  private dataBucket: string;

  constructor(dataBucket?: string) {
    this.dataBucket = !dataBucket
      ? CodicomUtils.env('DATA_BUCKET_NAME')
      : dataBucket;
  }

  public setDataBucket(bucketName: string): void {
    this.dataBucket = bucketName;
  }

  public exists(key: string): Observable<boolean> {
    const request: HeadObjectRequest = {
      Bucket: this.dataBucket,
      Key: key
    };
    return Observable.create((observer: Observer<boolean>) => {
      this.s3.headObject(request, (err: AWSError, data: HeadObjectOutput) => {
        if (err) {
          observer.next(false);
          if (err.code !== 'Not Found') {
            this.LOG.error(`Unexpected error checking for key[${key}]: `, err);
          }
        } else {
          observer.next(true);
        }
        observer.complete();
      });
    });
  }

  public saveJSON<T>(key: string, obj: T): Observable<boolean> {
    return this.saveText(key, obj, 'application/json');
  }

  public saveText<T>(
    key: string,
    obj: T,
    contentType?: string
  ): Observable<boolean> {
    return this.saveBinary(key, JSON.stringify(obj), contentType);
  }

  public saveBinary<T>(
    key: string,
    obj: T,
    contentType?: string
  ): Observable<boolean> {
    const request: PutObjectRequest = {
      Bucket: this.dataBucket,
      Key: key,
      Body: obj,
      ContentType: contentType
    };
    return this.save(key, request);
  }

  private save<T>(key: string, request: PutObjectRequest): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.s3.putObject(request, (err: AWSError, data: PutObjectOutput) => {
        if (err) {
          this.LOG.error(`Failed to store key[${key}]: `, err);
          observer.next(false);
        } else {
          observer.next(true);
        }
        observer.complete();
      });
    });
  }

  public remove(key: string): Observable<boolean> {
    return this.removeAll([key]);
  }

  public removeAll(keys: string[]): Observable<boolean> {
    let rval: Observable<boolean> = of(true);

    if (keys && keys.length > 0) {
      const deleteObjs: ObjectIdentifier[] = [];
      for (let key of keys) {
        deleteObjs.push({ Key: key });
      }

      const request: DeleteObjectsRequest = {
        Bucket: this.dataBucket,
        Delete: {
          Objects: deleteObjs
        }
      };

      rval = Observable.create((observer: Observer<boolean>) => {
        this.s3.deleteObjects(
          request,
          (err: AWSError, data: DeleteObjectsOutput) => {
            if (err) {
              this.LOG.error(`Failed to delete: `, err);
              observer.next(false);
            } else {
              observer.next(true);
            }
            observer.complete();
          }
        );
      });
    }

    return rval;
  }

  public load<T>(key: string, defaultValue?: T): Observable<T> {
    return this.getBody(key).pipe(
      map((body: S3.Body) => JSON.parse(body.toString())),
      defaultIfEmpty(defaultValue)
    );
  }

  public getBody(key: string): Observable<S3.Body> {
    const request: GetObjectRequest = {
      Bucket: this.dataBucket,
      Key: key
    };
    return Observable.create((observer: Observer<S3.Body>) => {
      this.s3.getObject(request, (err: AWSError, data: GetObjectOutput) => {
        if (!err) {
          observer.next(data.Body);
          observer.complete();
        } else {
          this.LOG.error(`Error loading S3 object[${key}]: `, err);
          observer.complete();
        }
      });
    });
  }

  public getKeys(prefix: string): Observable<string[]> {
    return this.getObjects(prefix).pipe(
      map((objs: S3.Object[]) => {
        let rval: string[] = [];
        for (const obj of objs) {
          rval.push(obj.Key);
        }
        return rval;
      })
    );
  }

  public getObjects(prefix: string): Observable<S3.Object[]> {
    const request: ListObjectsRequest = {
      Bucket: this.dataBucket,
      Prefix: prefix
    };
    this.LOG.trace('Sending S3 listObjects request: ', request);
    return Observable.create((observer: Observer<S3.Object[]>) => {
      this.s3.listObjects(request, (err, data) => {
        if (!err) {
          this.LOG.trace('S3 listObjects response: ', data);
          let rval: S3.Object[] = [];
          for (const entry of data.Contents) {
            rval.push(entry);
          }
          observer.next(rval);
          observer.complete();
        } else {
          this.LOG.error('Error getting existing s3 objects: ', err);
          observer.complete();
        }
      });
    });
  }
}
