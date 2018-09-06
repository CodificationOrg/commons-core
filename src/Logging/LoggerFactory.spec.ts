import * as test from 'tape';
import { Level } from './Level';
import { LoggerFactory } from './LoggerFactory';

test('LoggerFactory Unit Tests', t => {
  const logger = LoggerFactory.getLogger('Foo');
  LoggerFactory.setLevel(logger, Level.INFO);

  t.is(logger.name, 'Foo', 'can create a logger');
  t.is(logger.error('Test entry: %j', { id: 'Foo', data: 7 }), true, 'will log error messages when enabled');
  t.is(logger.debug('Test entry'), false, 'will not log debug messages when disabled');

  LoggerFactory.setLevel(logger, undefined);
  LoggerFactory.GLOBAL_LEVEL = Level.ALL;

  t.equals(logger.level, LoggerFactory.GLOBAL_LEVEL, 'logger will return the GLOBAL_LEVEL when not defined');
  t.is(logger.debug('Debug test entry'), true, 'logger will respect the GLOBAL_LEVEL when not defined specifically');
  t.is(logger.trace('Trace test entry'), true, 'logger will print trace level when enabled');

  t.end();
});
