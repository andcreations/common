import { addBusEventListener, addBusRequestListener } from './listeners';
import { getBusRequestHandlers, getBusEventsHandlers } from './handlers';

/** */
export const BusListener = (): ClassDecorator => {
  return function(target: Function) {
    const name = target.name;
    const holder: { [key: string]: any } = {};

    const requestHandlers = getBusRequestHandlers(target);
    const eventHandlers = getBusEventsHandlers(target);

    holder[name] = class extends (target as { new (...args: any[]): any }) {
      public constructor(...args: any) {
        super(...args);
        const self = this;

      // request listener
        addBusRequestListener({
          canHandleRequest: (topic: string) => {
            return requestHandlers.some(itr => itr.topic === topic);
          },

          handleRequest: async <T, R>(topic: string, payload?: T) => {
            const [handler] = requestHandlers.filter(itr => {
              return itr.topic === topic;
            });
            const methodName = handler.methodName;
            return self[methodName].call(self, payload);
          }
        })

      // event listener
        addBusEventListener({
          handleEvent: async <T>(topic: string, payload?: T) => {
            const handlers = eventHandlers.filter(itr => {
              return itr.topic === topic;
            });
            for (const handler of handlers) {
              const methodName = handler.methodName;
              await self[methodName].call(self, payload);
            }
          }
        });
      }
    };

    return holder[name];
  }
}