import { Config } from './Config';

export class Env {
  public static readonly ENV_STAGE = 'STAGE';
  public static readonly ENV_PROD_STAGE = 'PROD_STAGE';

  public static readonly DEFAULT_PROD_STAGE = 'prod';

  public static isProd(): boolean {
    return Config.get(this.ENV_STAGE) === Config.get(this.ENV_PROD_STAGE, this.DEFAULT_PROD_STAGE);
  }

  public static isDev(): boolean {
    return !this.isProd();
  }
}
