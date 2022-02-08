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
const requestHandlers: BusHandler[] = [];
const eventHandlers: BusHandler[] = [];

/** */
export function addBusRequestHandler(handler: BusHandler): void {
  const hasHandler = requestHandlers.some(itr => {
    return itr.topic === handler.topic;
  });
  if (hasHandler) {
    throw Error(`Duplicated bus request handler of topic ${handler.topic}`);
  }
  requestHandlers.push(handler);
}

/** */
export function addBusEventHandler(handler: BusHandler): void {
  eventHandlers.push(handler);
}

/** */
export function getBusRequestHandlers(
  clazz: Function,
): BusHandler[] {
  return requestHandlers.filter(handler => {
    return handler.clazz === clazz;
  });
}

/** */
export function getBusEventsHandlers(
  clazz: Function,
): BusHandler[] {
  return eventHandlers.filter(handler => {
    return handler.clazz === clazz;
  });
}
