/** */
export interface BusRequestListener {
    /** */
    canHandleRequest(topics: string): boolean;
    /** */
    handleRequest<T, R>(topic: string, payload?: T): Promise<R>;
}
/** */
export interface BusEventListener {
    /** */
    handleEvent<T>(topic: string, payload?: T): Promise<void>;
}
/** */
export declare function addBusRequestListener(listener: BusRequestListener): void;
/** */
export declare function removeBusRequestListener(listener: BusRequestListener): void;
/** */
export declare function addBusEventListener(listener: BusEventListener): void;
/** */
export declare function removeBusEventListener(listener: BusEventListener): void;
/** */
export declare function handleBusRequest<T, R>(topic: string, payload?: T): Promise<R>;
/** */
export declare function handleBusEvent<T>(topic: string, payload?: T): Promise<void>;
