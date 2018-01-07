import * as test from 'tape';
import { Config } from './Config';
import { Env } from './Env';

test('Env Unit Tests', t => {
  Config.put(Env.ENV_STAGE, 'dev');
  t.is(Env.isDev(), true, 'correctly returns dev status');
  Config.put(Env.ENV_STAGE, Env.DEFAULT_PROD_STAGE);
  t.is(Env.isProd(), true, 'correctly returns prod status');
  t.end();
});
