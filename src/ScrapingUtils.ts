import * as Cheerio from 'cheerio';
import * as WebRequest from 'web-request';

import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { HttpUtils } from './network/HttpUtils';
import { Logger } from './logging/Logger';
import { LoggerFactory } from './logging/LoggerFactory';

export class ScrapingUtils {
  private static LOG = LoggerFactory.getLogger('ScrapingUtils');

  public static scrapeAttributeValueFromURL(
    url: string,
    selectors: AttributeSelector[],
    maxRetries?: number
  ): Observable<string> {
    return HttpUtils.fetchContentAsString(
      url,
      maxRetries ? maxRetries : 0
    ).pipe(
      map((pageContent: string) =>
        this.scrapeAttributeValueFromString(pageContent, selectors)
      )
    );
  }

  public static scrapeAttributeValueFromString(
    pageContent: string,
    selectors: AttributeSelector[]
  ): string {
    this.LOG.trace('Starting scrape on content: ', pageContent);

    let rval: string;
    const html = Cheerio.load(pageContent);
    for (const sel of selectors) {
      if (
        html(sel.selector).length > 0 &&
        html(sel.selector).attr(sel.attribute).length > 0
      ) {
        rval = html(sel.selector).attr(sel.attribute);
        this.LOG.trace(
          `Attribute value [${rval}] found in content: `,
          pageContent
        );
        break;
      }
    }
    if (!rval) {
      this.LOG.warn('Failed to find attribute value: ', pageContent, selectors);
    }
    return rval;
  }
}

export interface AttributeSelector {
  selector: string;
  attribute: string;
}
