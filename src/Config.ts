export class Config {
  public static put(key: string, value: string): string {
    const rval = this.get(key);
    this.config[key] = value;
    return rval;
  }

  public static get(key: string, defaultValue: string = ''): string {
    let rval = this.config[key] ? this.config[key] : process.env[key];
    if (rval == null) {
      rval = defaultValue;
      console.warn(`Config [${key}] not found, returning default value.`);
    }
    return rval;
  }

  private static config: { [key: string]: string } = {};
}
