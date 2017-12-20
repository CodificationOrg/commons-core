import { LoggingEvent } from './LoggingEvent';
import { CodicomUtils } from '../CodicomUtils';

export interface Layout {
  format(event: LoggingEvent): string;
}

export class BasicLayout implements Layout {
  timestampFormat = 'YYYY-MM-DD HH:mm:ss,SSS';

  format(event: LoggingEvent): string {
    const optionalParams = event.optionalParams
      ? `${event.optionalParams}`
      : '';
    return `${CodicomUtils.now().format(
      this.timestampFormat
    )} - ${event.logger.getName()} - ${event.level.getName()} - ${
      event.message
    } ${optionalParams}`;
  }
}
