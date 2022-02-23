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
declare const andcreations_BusRequestHandlers: BusHandler[];
(global as any).andcreations_BusRequestHandlers = [];

/** */
declare const andcreations_BusEventHandlers: BusHandler[];
(global as any).andcreations_BusEventHandlers = [];

/** */
export function addBusRequestHandler(handler: BusHandler): void {
  const hasHandler = andcreations_BusRequestHandlers.some(itr => {
    return itr.topic === handler.topic;
  });
  if (hasHandler) {
    throw Error(`Duplicated bus request handler of topic ${handler.topic}`);
  }
  andcreations_BusRequestHandlers.push(handler);
}

/** */
export function addBusEventHandler(handler: BusHandler): void {
  andcreations_BusEventHandlers.push(handler);
}

/** */
export function getBusRequestHandlers(
  clazz: Function,
): BusHandler[] {
  return andcreations_BusRequestHandlers.filter(handler => {
    return handler.clazz === clazz;
  });
}

/** */
export function getBusEventsHandlers(
  clazz: Function,
): BusHandler[] {
  return andcreations_BusEventHandlers.filter(handler => {
    return handler.clazz === clazz;
  });
}
