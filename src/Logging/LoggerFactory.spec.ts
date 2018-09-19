import * as test from 'tape';

import { Level } from './Level';
import { LoggerFactory } from './LoggerFactory';

test('LoggerFactory Unit Tests', assert => {
  const logger = LoggerFactory.getLogger('Foo');
  LoggerFactory.setLevel(logger, Level.INFO);

  assert.is(logger.name, 'Foo', 'can create a logger');
  assert.is(logger.error('Test entry: %j', { id: 'Foo', data: 7 }), true, 'will log error messages when enabled');
  assert.is(logger.debug('Test entry'), false, 'will not log debug messages when disabled');

  LoggerFactory.setLevel(logger, undefined);
  LoggerFactory.GLOBAL_LEVEL = Level.ALL;

  assert.equals(logger.level, LoggerFactory.GLOBAL_LEVEL, 'logger will return the GLOBAL_LEVEL when not defined');
  assert.is(logger.debug('Debug test entry'), true, 'logger will respect the GLOBAL_LEVEL when not defined specifically');
  assert.is(logger.trace('Trace test entry'), true, 'logger will print trace level when enabled');

  assert.end();
});
