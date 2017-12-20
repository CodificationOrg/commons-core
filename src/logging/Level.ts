export class Level {
  public static readonly OFF = new Level('OFF', 0);
  public static readonly FATAL = new Level('FATAL', 1);
  public static readonly ERROR = new Level('ERROR', 2);
  public static readonly WARN = new Level('WARN', 3);
  public static readonly INFO = new Level('INFO', 4);
  public static readonly DEBUG = new Level('DEBUG', 5);
  public static readonly TRACE = new Level('TRACE', 6);
  public static readonly ALL = new Level('ALL', 7);

  private static readonly ALL_LEVELS = [
    Level.OFF,
    Level.FATAL,
    Level.ERROR,
    Level.WARN,
    Level.INFO,
    Level.DEBUG,
    Level.TRACE,
    Level.ALL
  ];

  public static toLevel(level: string | number): Level {
    let rval: Level;
    if (typeof level === 'number') {
      rval = Level.ALL[level];
    } else {
      const filtered = this.ALL_LEVELS.filter(
        lvl => lvl.getName() === level.toUpperCase()
      );
      rval = filtered.length > 0 ? filtered[0] : undefined;
    }
    return rval;
  }

  private name: string;
  private priority: number;

  private constructor(name: string, priority: number) {
    this.name = name;
    this.priority = priority;
  }

  public getName(): string {
    return this.name;
  }

  public getPriority(): number {
    return this.priority;
  }

  public isGreaterOrEqual(level: Level): boolean {
    return this.priority >= level.priority;
  }
}
