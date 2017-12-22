import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as WebRequest from 'web-request';

import { Logger } from '../logging/Logger';
import { LoggerFactory } from './../logging/LoggerFactory';

export class HttpUtils {
  private static LOG = LoggerFactory.getLogger('HttpUtils');

  public static fetchContentAsString(
    url: string,
    maxRetries: number = 0
  ): Observable<string> {
    this.LOG.trace(
      `Fetching content from [${url}], with a maximum of ${maxRetries} retries.`
    );
    return fromPromise(WebRequest.get(url)).pipe(
      map((response: WebRequest.Response<string>) => {
        if (response.statusCode >= 400) {
          this.LOG.error(
            `Received error statusCode [${
              response.statusCode
            }] from [${url}]: `,
            response.content
          );
          throw 'Failed with status code: ' + response.statusCode;
        } else {
          this.LOG.debug(
            `Received statusCode [${
              response.statusCode
            }] from [${url}] with content: `,
            response.content
          );
        }
        return response.content;
      }),
      retry(maxRetries)
    );
  }
}
