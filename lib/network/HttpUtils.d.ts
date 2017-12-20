import { Observable } from 'rxjs';
export declare class HttpUtils {
    private static LOG;
    static fetchContentAsString(url: string, maxRetries?: number): Observable<string>;
}
