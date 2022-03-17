/** */
export class InvalidTimePeriodStringError extends Error {
  /** */
  constructor(timePeriodStr: string) {
    super(`Invalid time period '${timePeriodStr}'`);
  }
}