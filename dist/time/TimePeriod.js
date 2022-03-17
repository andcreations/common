"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimePeriod = void 0;
const milliseconds_1 = require("./milliseconds");
const InvalidTimePeriodStringError_1 = require("./InvalidTimePeriodStringError");
/** */
const SECONDS_CHARACTER = 's';
const MINUTES_CHARACTER = 'm';
const HOURS_CHARACTER = 'h';
const DAYS_CHARACTER = 'd';
/** */
class TimePeriod {
    /** */
    static toStr(timeMs) {
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
    static fromStr(str) {
        if (!str.length) {
            throw new InvalidTimePeriodStringError_1.InvalidTimePeriodStringError(str);
        }
        const unitCharacters = `${SECONDS_CHARACTER}` +
            `${MINUTES_CHARACTER}` +
            `${HOURS_CHARACTER}` +
            `${DAYS_CHARACTER}`;
        const isDigit = (ch) => ch[0] >= '0' && ch[0] <= '9';
        const isUnit = (ch) => unitCharacters.includes(ch);
        // validate characters
        for (let index = 0; index < str.length; index++) {
            const ch = str.charAt(index);
            if (!isDigit(ch) && !isUnit(ch)) {
                throw new InvalidTimePeriodStringError_1.InvalidTimePeriodStringError(str);
            }
        }
        const unitToMilliseconds = {
            [SECONDS_CHARACTER]: (0, milliseconds_1.secondsToMilliseconds)(),
            [MINUTES_CHARACTER]: (0, milliseconds_1.minutesToMilliseconds)(),
            [HOURS_CHARACTER]: (0, milliseconds_1.hoursToMilliseconds)(),
            [DAYS_CHARACTER]: (0, milliseconds_1.daysToMilliseconds)(),
        };
        // parse
        const unitsSet = new Set();
        let totalMilliseconds = 0;
        let valueStr = '';
        for (let index = 0; index < str.length; index++) {
            const ch = str.charAt(index);
            // validate
            if (!isDigit(ch) && !isUnit(ch)) {
                throw new InvalidTimePeriodStringError_1.InvalidTimePeriodStringError(str);
            }
            // unit? append the parse value
            if (isUnit(ch)) {
                if (!valueStr.length || unitsSet.has(ch)) {
                    throw new InvalidTimePeriodStringError_1.InvalidTimePeriodStringError(str);
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
            throw new InvalidTimePeriodStringError_1.InvalidTimePeriodStringError(str);
        }
        return totalMilliseconds;
    }
}
exports.TimePeriod = TimePeriod;
