"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTimePeriodStringError = void 0;
/** */
class InvalidTimePeriodStringError extends Error {
    /** */
    constructor(timePeriodStr) {
        super(`Invalid time period '${timePeriodStr}'`);
    }
}
exports.InvalidTimePeriodStringError = InvalidTimePeriodStringError;
