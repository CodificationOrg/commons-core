import { Logger } from './Logger';
import { Layout, BasicLayout } from './Layout';
import { LoggingEvent } from './LoggingEvent';
import { Level } from './Level';
import { ConsoleAppender, Appender } from './Appender';
import { CommonsUtils } from '../CommonsUtils';

export class LoggerFactory {
  private static LOGGERS = [];

  public static GLOBAL_LEVEL: Level;
  public static GLOBAL_APPENDER: Appender = new ConsoleAppender();

  private constructor() {}

  public static getLogger(name: string | Object): Logger {
    this.init();

    let loggerName = typeof name === 'string' ? name : typeof name;
    let rval: Logger = this.LOGGERS[loggerName];
    if (!rval) {
      rval = this.initialize(new DefaultLoggerImpl(loggerName));
      this.LOGGERS[loggerName] = rval;
    }

    return rval;
  }

  private static init(): void {
    if (!this.GLOBAL_LEVEL) {
      this.GLOBAL_LEVEL = Level.toLevel(
        CommonsUtils.env('LOGGING_LEVEL', 'INFO')
      );
    }
  }

  private static initialize(logger: DefaultLoggerImpl): Logger {
    const levelName = CommonsUtils.env('LOGGING_LEVEL_' + logger.getName());
    if (levelName.length > 0) {
      logger.setLevel(Level.toLevel(levelName));
    }
    return logger;
  }

  public static setLevel(logger: Logger, level: Level): Logger {
    if (logger instanceof DefaultLoggerImpl) {
      (<DefaultLoggerImpl>logger).setLevel(level);
    }
    return logger;
  }

  public static setAppender(logger: Logger, appender: Appender): Logger {
    if (logger instanceof DefaultLoggerImpl) {
      (<DefaultLoggerImpl>logger).setAppender(appender);
    }
    return logger;
  }
}

class DefaultLoggerImpl implements Logger {
  private name: string;
  private level: Level;
  private appender: Appender;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getLevel(): Level {
    return !this.level ? LoggerFactory.GLOBAL_LEVEL : this.level;
  }

  setLevel(level: Level): void {
    this.level = level;
  }

  public getAppender(): Appender {
    return !this.appender ? LoggerFactory.GLOBAL_APPENDER : this.appender;
  }

  setAppender(appender: Appender): void {
    this.appender = appender;
  }

  public fatal(message: any, ...optionalParams: any[]): boolean {
    return this.log(Level.FATAL, message, ...optionalParams);
  }

  public error(message: any, ...optionalParams: any[]): boolean {
    return this.log(Level.ERROR, message, ...optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]): boolean {
    return this.log(Level.WARN, message, ...optionalParams);
  }

  public info(message: any, ...optionalParams: any[]): boolean {
    return this.log(Level.INFO, message, ...optionalParams);
  }

  public debug(message: any, ...optionalParams: any[]): boolean {
    return this.log(Level.DEBUG, message, ...optionalParams);
  }

  public trace(message: any, ...optionalParams: any[]): boolean {
    return this.log(Level.TRACE, message, ...optionalParams);
  }

  private log(level: Level, message: any, ...optionalParams: any[]): boolean {
    const rval = this.isEnabled(level);
    if (rval) {
      this.getAppender().doAppend(
        new LoggingEvent(this, level, message, optionalParams)
      );
    }
    return rval;
  }

  public isEnabled(level: Level) {
    return this.getLevel().isGreaterOrEqual(level);
  }
}
