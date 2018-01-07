import * as crypto from 'crypto';

export class CryptoUtils {
  public static toMd5Hex(value: string): string {
    return crypto
      .createHash('md5')
      .update(value)
      .digest('hex');
  }
}
