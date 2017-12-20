import { LoggerFactory } from './logging/LoggerFactory';
import { Level } from './logging/Level';
import { ScrapingUtils } from './ScrapingUtils';
import { expect } from 'chai';

describe('ScrapingUtils static content unit tests', () => {
  LoggerFactory.GLOBAL_LEVEL = Level.ALL;

  it('Can find attribute value', () => {
    const rval = ScrapingUtils.scrapeAttributeValueFromString(
      '<img src="abc.png" title="Test">',
      [{ selector: 'img[title^="Test"]', attribute: 'src' }]
    );
    expect(rval).to.be.equal('abc.png');
  });
});
