import { LoggerFactory } from './LoggerFactory';
import { Logger } from './Logger';
import { Level } from './Level';

describe('LoggerFactory unit tests', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = LoggerFactory.getLogger('Foo');
    LoggerFactory.setLevel(logger, Level.INFO);
  });

  it('Can create a logger', () => {
    expect(logger.getName()).toBe('Foo');
  });

  it('Will log error messages when enabled', () => {
    expect(logger.error('Test entry')).toBe(true);
  });

  it('Will not log debug messages when disabled', () => {
    expect(logger.debug('Test entry')).toBe(false);
  });

  it('Will respect global log level', () => {
    LoggerFactory.setLevel(logger, undefined);
    LoggerFactory.GLOBAL_LEVEL = Level.ALL;
    expect(logger.getLevel()).toBe(LoggerFactory.GLOBAL_LEVEL);
    expect(logger.debug('Test entry')).toBe(true);
  });
});
