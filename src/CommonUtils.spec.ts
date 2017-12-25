import * as test from 'tape';
import { CommonsUtils } from './CommonsUtils';

test('CommonUtils Unit Tests', t => {
  t.plan(1);
  t.is(
    CommonsUtils.toMd5Hex('This is a test string.'),
    '1620d7b066531f9dbad51eee623f7635',
    'can generate an MD5 hex hash'
  );
});
