import * as md5 from 'blueimp-md5';

export class CryptoUtils {
  public static toMd5Hex(value: string): string {
    return md5(value);
  }
}
