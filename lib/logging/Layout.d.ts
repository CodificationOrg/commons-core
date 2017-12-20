import { LoggingEvent } from './LoggingEvent';
export interface Layout {
    format(event: LoggingEvent): string;
}
export declare class BasicLayout implements Layout {
    timestampFormat: string;
    format(event: LoggingEvent): string;
}
