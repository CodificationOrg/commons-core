import { Level } from './Level';
export interface Logger {
    getName(): string;
    getLevel(): Level;
    isEnabled(Level: Level): boolean;
    fatal(message: any, ...optionalParams: any[]): boolean;
    error(message: any, ...optionalParams: any[]): boolean;
    warn(message: any, ...optionalParams: any[]): boolean;
    info(message: any, ...optionalParams: any[]): boolean;
    debug(message: any, ...optionalParams: any[]): boolean;
    trace(message: any, ...optionalParams: any[]): boolean;
}
