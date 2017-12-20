import { Layout } from './Layout';
import { LoggingEvent } from './LoggingEvent';
export interface Appender {
    name: string;
    layout: Layout;
    doAppend(event: LoggingEvent): void;
}
export declare class ConsoleAppender implements Appender {
    name: string;
    layout: Layout;
    constructor(name?: string, layout?: Layout);
    doAppend(event: LoggingEvent): void;
}
