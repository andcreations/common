/** */
export function secondsToMilliseconds(seconds = 1): number {
  return seconds * 1000;
}

/** */
export function minutesToMilliseconds(minutes = 1): number {
  return minutes * secondsToMilliseconds(60);
}

/** */
export function hoursToMilliseconds(hours = 1): number {
  return hours * minutesToMilliseconds(60);
}

/** */
export function daysToMilliseconds(days = 1): number {
  return days * hoursToMilliseconds(24);
}


/** */
export function millisecondsToSeconds(milliseconds: number): number {
  return milliseconds / 1000;
}