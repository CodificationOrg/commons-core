import { LoggerFactory } from "./LoggerFactory";
import { Logger } from "./Logger";
import { Level } from "./Level";
import * as test from "tape";

test("LoggerFactory Unit Tests", t => {
  let logger = LoggerFactory.getLogger("Foo");
  LoggerFactory.setLevel(logger, Level.INFO);

  t.is(logger.getName(), "Foo", "can create a logger");
  t.is(
    logger.error("Test entry"),
    true,
    "will log error messages when enabled"
  );
  t.is(
    logger.debug("Test entry"),
    false,
    "will not log debug messages when disabled"
  );

  LoggerFactory.setLevel(logger, undefined);
  LoggerFactory.GLOBAL_LEVEL = Level.ALL;

  t.equals(
    logger.getLevel(),
    LoggerFactory.GLOBAL_LEVEL,
    "logger will return the GLOBAL_LEVEL when not defined"
  );
  t.is(
    logger.debug("Test entry"),
    true,
    "logger will respect the GLOBAL_LEVEL when not defined specifically"
  );

  t.end();
});
