import { HttpUtils } from './HttpUtils';
import { Level } from './../logging/Level';
import { LoggerFactory } from '../logging/LoggerFactory';

describe('HttpUtils success unit tests', () => {
  LoggerFactory.GLOBAL_LEVEL = Level.ALL;

  let result;

  beforeEach(done => {
    HttpUtils.fetchContentAsString('http://httpstat.us/200').subscribe(
      response => {
        result = response;
      },
      null,
      () => done()
    );
  });

  it('Can fetch string content', () => {
    expect(result).toBeDefined();
  });
});

describe('HttpUtils failure unit tests', () => {
  LoggerFactory.GLOBAL_LEVEL = Level.ALL;

  let error;

  beforeEach(done => {
    HttpUtils.fetchContentAsString('http://httpstat.us/404', 2).subscribe(
      null,
      err => {
        error = err;
        done();
      },
      () => done()
    );
  });

  it('Will return an error', () => {
    expect(error).toBeDefined();
  });
});
