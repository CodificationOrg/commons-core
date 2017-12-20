import { HttpUtils } from './HttpUtils';
import { Level } from './../logging/Level';
import { LoggerFactory } from '../logging/LoggerFactory';
import { expect } from 'chai';

describe('HttpUtils success unit tests', () => {
  LoggerFactory.GLOBAL_LEVEL = Level.ALL;

  it('Can fetch string content', done => {
    HttpUtils.fetchContentAsString('http://httpstat.us/200').subscribe(
      result => expect(result).to.not.be.undefined && done()
    );
  });
});

describe('HttpUtils failure unit tests', () => {
  LoggerFactory.GLOBAL_LEVEL = Level.ALL;

  it('Will return an error on 404', done => {
    HttpUtils.fetchContentAsString('http://httpstat.us/404', 2).subscribe(
      null,
      err => expect(err).to.not.be.undefined && done()
    );
  });
});
