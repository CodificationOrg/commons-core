import * as test from "tape";
import { ScrapingUtils } from "./ScrapingUtils";

test("ScrapingUtils Unit Tests", t => {
  t.plan(1);
  const rval = ScrapingUtils.scrapeAttributeValueFromString(
    '<img src="abc.png" title="Test">',
    [{ selector: 'img[title^="Test"]', attribute: "src" }]
  );
  t.equals(
    rval,
    "abc.png",
    "scapeAttributeValueFromString() should find the attribute value"
  );
});
