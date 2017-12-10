import { Moment } from 'moment-timezone';
export declare class CodicomUtils {
    static ENV_STAGE: string;
    static STAGE_DEV: string;
    static STAGE_PROD: string;
    static DATE_UNIT: string;
    static TIME_ZONE: string;
    static isProd(): boolean;
    static corsHeaders(origin?: string, headers?: string, methods?: string): {
        'Access-Control-Allow-Origin': string;
        'Access-Control-Allow-Headers': string;
        'Access-Control-Allow-Methods': string;
    };
    static env(key: string, defaultValue?: string): string;
    static daysBeforeToday(days: number): Moment;
    static daysFromToday(days: number): Moment;
    static today(): Moment;
    static now(): Moment;
    static toMd5Hex(value: string): string;
}
