export declare class Level {
    static readonly OFF: Level;
    static readonly FATAL: Level;
    static readonly ERROR: Level;
    static readonly WARN: Level;
    static readonly INFO: Level;
    static readonly DEBUG: Level;
    static readonly TRACE: Level;
    static readonly ALL: Level;
    private static readonly ALL_LEVELS;
    static toLevel(level: string | number): Level;
    private name;
    private priority;
    private constructor();
    getName(): string;
    getPriority(): number;
    isGreaterOrEqual(level: Level): boolean;
}
