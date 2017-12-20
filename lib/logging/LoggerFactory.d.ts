import { Logger } from './Logger';
import { Level } from './Level';
import { Appender } from './Appender';
export declare class LoggerFactory {
    private static LOGGERS;
    static GLOBAL_LEVEL: Level;
    static GLOBAL_APPENDER: Appender;
    private constructor();
    static getLogger(name: string | Object): Logger;
    private static init();
    private static initialize(logger);
    static setLevel(logger: Logger, level: Level): Logger;
    static setAppender(logger: Logger, appender: Appender): Logger;
}
