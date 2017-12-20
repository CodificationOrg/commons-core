import { Observable } from 'rxjs';
export declare class ScrapingUtils {
    private static LOG;
    static scrapeAttributeValueFromURL(url: string, selectors: AttributeSelector[], maxRetries?: number): Observable<string>;
    static scrapeAttributeValueFromString(pageContent: string, selectors: AttributeSelector[]): string;
}
export interface AttributeSelector {
    selector: string;
    attribute: string;
}
