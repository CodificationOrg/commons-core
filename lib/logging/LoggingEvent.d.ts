import { Logger } from './Logger';
import { Level } from './Level';
export declare class LoggingEvent {
    logger: Logger;
    level: Level;
    message: any;
    optionalParams: any[];
    constructor(logger: Logger, level: Level, message: any, ...optionalParams: any[]);
}
