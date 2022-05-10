/** */
export interface Starter {
    /** Class (constructor). */
    clazz: Function;
    /** Name of the method to call. */
    methodName: string;
}
/** */
export declare function addStarter(starter: Starter): void;
/** */
export declare function getClassStartMethodNames(clazz: Function): string[];
