import {
  daysToMilliseconds,
  hoursToMilliseconds,
  minutesToMilliseconds,
  secondsToMilliseconds
} from './milliseconds';
import {
  InvalidTimePeriodStringError,
} from './InvalidTimePeriodStringError';

/** */
const SECONDS_CHARACTER = 's';
const MINUTES_CHARACTER = 'm';
const HOURS_CHARACTER = 'h';
const DAYS_CHARACTER = 'd';

/** */
export class TimePeriod {
  /** */
  static toStr(timeMs: number): string {
    let time = Math.floor(timeMs / 1000);

  // seconds
    const seconds = time % 60;
    const secondsStr = seconds ? `${seconds}${SECONDS_CHARACTER}` : '';
    time = (time - seconds) / 60;
  
  // minutes
    const minutes = time % 60;
    const minutesStr = minutes ? `${minutes}${MINUTES_CHARACTER}` : '';
    time = (time - minutes) / 60;
  
  // hours
    const hours = time % 24;
    const hoursStr = hours ? `${hours}${HOURS_CHARACTER}` : '';
    time = (time - hours) / 24;
  
  // days
    const days = time;
    const daysStr = days ? `${days}${DAYS_CHARACTER}` : '';
  
    if (!seconds && !minutes && !hours && !days) {
      return `0${SECONDS_CHARACTER}`;
    }
    return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`;
  }

  /** */
  static fromStr(str: string): number {
    if (!str.length) {
      throw new InvalidTimePeriodStringError(str);
    }

    const unitCharacters = 
      `${SECONDS_CHARACTER}` +
      `${MINUTES_CHARACTER}` +
      `${HOURS_CHARACTER}` +
      `${DAYS_CHARACTER}`;
    const isDigit = (ch: string): boolean => ch[0] >= '0' && ch[0] <= '9';
    const isUnit = (ch: string): boolean => unitCharacters.includes(ch);

  // validate characters
    for (let index = 0; index < str.length; index++) {
      const ch = str.charAt(index);
      if (!isDigit(ch) && !isUnit(ch)) {
        throw new InvalidTimePeriodStringError(str);
      }
    }
  
    const unitToMilliseconds: { [unit: string]: number } = {
      [SECONDS_CHARACTER]: secondsToMilliseconds(),
      [MINUTES_CHARACTER]: minutesToMilliseconds(),
      [HOURS_CHARACTER]: hoursToMilliseconds(),
      [DAYS_CHARACTER]: daysToMilliseconds(),
    };
  
  // parse
    const unitsSet = new Set<string>();
    let totalMilliseconds = 0;
    let valueStr = '';
    for (let index = 0; index < str.length; index++) {
      const ch = str.charAt(index);
  
    // validate
      if (!isDigit(ch) && !isUnit(ch)) {
        throw new InvalidTimePeriodStringError(str);
      }
  
    // unit? append the parse value
      if (isUnit(ch)) {
        if (!valueStr.length || unitsSet.has(ch)) {
          throw new InvalidTimePeriodStringError(str);
        }
        const value = parseInt(valueStr);
        valueStr = '';
        totalMilliseconds += unitToMilliseconds[ch] * value;
        continue;
      }
  
      valueStr += ch;
    }

  // period must end with a unit
    if (valueStr.length > 0) {
      throw new InvalidTimePeriodStringError(str);
    }
  
    return totalMilliseconds;
  }
}