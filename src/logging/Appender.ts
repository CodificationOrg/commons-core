import { Layout, BasicLayout } from './Layout';
import { LoggingEvent } from './LoggingEvent';

export interface Appender {
  name: string;
  layout: Layout;
  doAppend(event: LoggingEvent): void;
}

export class ConsoleAppender implements Appender {
  name: string;
  layout: Layout;

  constructor(name: string = 'console', layout: Layout = new BasicLayout()) {
    this.name = name;
    this.layout = layout;
  }

  doAppend(event: LoggingEvent): void {
    console.log(this.layout.format(event));
  }
}
