"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.millisecondsToSeconds = exports.daysToMilliseconds = exports.hoursToMilliseconds = exports.minutesToMilliseconds = exports.secondsToMilliseconds = void 0;
/** */
function secondsToMilliseconds(seconds = 1) {
    return seconds * 1000;
}
exports.secondsToMilliseconds = secondsToMilliseconds;
/** */
function minutesToMilliseconds(minutes = 1) {
    return minutes * secondsToMilliseconds(60);
}
exports.minutesToMilliseconds = minutesToMilliseconds;
/** */
function hoursToMilliseconds(hours = 1) {
    return hours * minutesToMilliseconds(60);
}
exports.hoursToMilliseconds = hoursToMilliseconds;
/** */
function daysToMilliseconds(days = 1) {
    return days * hoursToMilliseconds(24);
}
exports.daysToMilliseconds = daysToMilliseconds;
/** */
function millisecondsToSeconds(milliseconds) {
    return milliseconds / 1000;
}
exports.millisecondsToSeconds = millisecondsToSeconds;
