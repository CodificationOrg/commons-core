import { Moment } from 'moment-timezone';
import * as moment from 'moment-timezone';

import * as crypto from 'crypto';

export class CommonsUtils {
  public static ENV_STAGE = 'STAGE';
  public static ENV_PROD_STAGE = 'PROD_STAGE';

  public static DEFAULT_PROD_STAGE = 'prod';

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

  public static toMd5Hex(value: string): string {
    return crypto
      .createHash('md5')
      .update(value)
      .digest('hex');
  }
}
