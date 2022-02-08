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
const requestListeners: BusRequestListener[] = [];
const eventListeners: BusEventListener[] = [];

/** */
export function addBusRequestListener(listener: BusRequestListener): void {
  requestListeners.push(listener);
}

/** */
export function addBusEventListener(listener: BusEventListener): void {
  eventListeners.push(listener);
}

/** */
export async function handleBusRequest<T, R>(
  topic: string,
  payload?: T
): Promise<R> {
  for (const listener of requestListeners) {
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
  for (const listener of eventListeners) {
    await listener.handleEvent(topic, payload);
  }
}