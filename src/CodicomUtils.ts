import { Moment } from 'moment-timezone';
import * as moment from 'moment-timezone';

import * as crypto from 'crypto';

export class CodicomUtils {
  public static ENV_STAGE = 'STAGE';

  public static STAGE_DEV = 'dev';
  public static STAGE_PROD = 'prod';

  public static DATE_UNIT = 'days';
  public static TIME_ZONE = 'America/Los_Angeles';

  public static isProd(): boolean {
    return this.env(this.ENV_STAGE, this.STAGE_DEV) == this.STAGE_PROD;
  }

  public static corsHeaders(
    origin: string = '*.codification.org',
    headers: string = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    methods: string = 'POST,OPTIONS,GET,PUT,PATCH,DELETE'
  ) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': headers,
      'Access-Control-Allow-Methods': methods
    };
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
    return moment.tz(this.TIME_ZONE);
  }

  public static toMd5Hex(value: string): string {
    return crypto
      .createHash('md5')
      .update(value)
      .digest('hex');
  }
}
