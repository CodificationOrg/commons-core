import { Moment } from 'moment-timezone';
import * as moment from 'moment-timezone';

import * as crypto from 'crypto';

export class CommonsUtils {
  public static ENV_STAGE = 'STAGE';
  public static ENV_PROD_STAGE = 'PROD_STAGE';

  public static ENV_TIMEZONE = 'TIMEZONE';

  public static DEFAULT_PROD_STAGE = 'prod';
  public static DEFAULT_TIME_ZONE = 'America/Los_Angeles';

  public static DATE_UNIT = 'days';

  public static isProd(): boolean {
    return (
      this.env(this.ENV_STAGE) ==
      this.env(this.ENV_PROD_STAGE, this.DEFAULT_PROD_STAGE)
    );
  }

  public static env(key: string, defaultValue: string = ''): string {
    let rval = process.env[key];
    if (rval == null) {
      rval = defaultValue;
      console.warn(
        `Environment variable [${key}] not found, returning default value.`
      );
    }
    return rval;
  }

  public static daysBeforeToday(days: number): Moment {
    return this.today().subtract(days as any, this.DATE_UNIT);
  }

  public static daysFromToday(days: number): Moment {
    return this.today().add(days as any, this.DATE_UNIT);
  }

  public static today(): Moment {
    return this.now()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
  }

  public static now(): Moment {
    return moment.tz(this.env(this.ENV_TIMEZONE, this.DEFAULT_TIME_ZONE));
  }

  public static toMd5Hex(value: string): string {
    return crypto
      .createHash('md5')
      .update(value)
      .digest('hex');
  }
}
