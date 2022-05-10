/** */
export interface Starter {
  /** Class (constructor). */
  clazz: Function;

  /** Name of the method to call. */
  methodName: string;
}

/** */
const starters: Starter[] = [];

/** */
export function addStarter(starter: Starter): void {
  starters.push(starter);
}

/** */
export function getClassStartMethodNames(clazz: Function): string[] {
  return starters
    .filter(starter => starter.clazz === clazz)
    .map(starter => starter.methodName);
}