import { HttpUtils } from "./HttpUtils";
import { Level } from "./../logging/Level";
import { LoggerFactory } from "../logging/LoggerFactory";
import * as test from "tape";

test("HttpUtils Unit Tests", t => {
  LoggerFactory.GLOBAL_LEVEL = Level.ALL;

  t.plan(2);

  HttpUtils.fetchContentAsString("http://httpstat.us/200").subscribe(result =>
    t.isNot(result, undefined, "can fetch string content from a url")
  );

  HttpUtils.fetchContentAsString("http://httpstat.us/404", 2).subscribe(
    null,
    err =>
      t.isNot(err, undefined, "will fail when receiving a statusCode > 399")
  );
});
