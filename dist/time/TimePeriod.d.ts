/** */
export interface TimePeriodValues {
    /** */
    days: number;
    /** */
    hours: number;
    /** */
    minutes: number;
    /** */
    seconds: number;
}
/** */
export declare class TimePeriod {
    /** */
    static toValues(timeMs: number): TimePeriodValues;
    /** */
    static toStr(timeMs: number): string;
    /** */
    static fromStr(str: string): number;
}
