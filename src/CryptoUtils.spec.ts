import * as test from 'tape';
import { CryptoUtils } from './CryptoUtils';

test('CryptoUtils Unit Tests', t => {
  t.is(CryptoUtils.toMd5Hex('This is a test string.'), '1620d7b066531f9dbad51eee623f7635', 'can generate an MD5 hex hash');
  t.end();
});
