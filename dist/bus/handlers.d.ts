/** */
export interface BusHandler {
    /** Class (constructor). */
    clazz: Function;
    /** Name of the method to call. */
    methodName: string;
    /** Topic. */
    topic: string;
}
/** */
export declare function addBusRequestHandler(handler: BusHandler): void;
/** */
export declare function addBusEventHandler(handler: BusHandler): void;
/** */
export declare function getBusRequestHandlers(clazz: Function): BusHandler[];
/** */
export declare function getBusEventsHandlers(clazz: Function): BusHandler[];
