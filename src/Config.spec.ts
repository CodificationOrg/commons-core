import * as test from 'tape';
import { Config } from './Config';

test('Config Unit Tests', t => {
  const expected = process.env['foo'];
  t.is(
    Config.get('foo'),
    expected ? expected : '',
    'correctly returns environment or default value'
  );
  Config.put('foo', 'bar');
  t.is(Config.get('foo'), 'bar', 'correctly returns runtime override value');
  t.end();
});
