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
declare const andcreations_BusRequestListeners: BusRequestListener[];
(global as any).andcreations_BusRequestListeners = [];

/** */
declare const andcreations_BusEventListeners: BusEventListener[];
(global as any).andcreations_BusEventListeners = [];

/** */
export function addBusRequestListener(listener: BusRequestListener): void {
  andcreations_BusRequestListeners.push(listener);
}

/** */
export function removeBusRequestListener(listener: BusRequestListener): void {
  const index = andcreations_BusRequestListeners.findIndex(itr => {
    return itr === listener;
  });
  if (index !== -1) {
    andcreations_BusRequestListeners.splice(index, 1);
  }
}

/** */
export function addBusEventListener(listener: BusEventListener): void {
  andcreations_BusEventListeners.push(listener);
}

/** */
export function removeBusEventListener(listener: BusEventListener): void {
  const index = andcreations_BusEventListeners.findIndex(itr => {
    return itr === listener;
  });
  if (index !== -1) {
    andcreations_BusEventListeners.splice(index, 1);
  }
}

/** */
export async function handleBusRequest<T, R>(
  topic: string,
  payload?: T
): Promise<R> {
  for (const listener of andcreations_BusRequestListeners) {
    if (listener.canHandleRequest(topic)) {
      return listener.handleRequest(topic, payload);
    }
  }
  throw new Error(`No bus request handler of topic ${topic}`)
}

/** */
export async function handleBusEvent<T>(
  topic: string,
  payload?: T
): Promise<void> {
  for (const listener of andcreations_BusEventListeners) {
    await listener.handleEvent(topic, payload);
  }
}