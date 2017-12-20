import { Logger } from './Logger';
import { Level } from './Level';

export class LoggingEvent {
  public optionalParams: any[];

  constructor(
    public logger: Logger,
    public level: Level,
    public message: any,
    ...optionalParams: any[]
  ) {
    if (optionalParams && optionalParams.length > 0) {
      this.optionalParams = optionalParams;
    }
  }
}
