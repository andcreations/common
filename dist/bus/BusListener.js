"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusListener = void 0;
const listeners_1 = require("./listeners");
const handlers_1 = require("./handlers");
/** */
const BusListener = () => {
    return function (target) {
        const name = target.name;
        const holder = {};
        const requestHandlers = (0, handlers_1.getBusRequestHandlers)(target);
        const eventHandlers = (0, handlers_1.getBusEventsHandlers)(target);
        holder[name] = class extends target {
            constructor(...args) {
                super(...args);
                const self = this;
                // request listener
                (0, listeners_1.addBusRequestListener)({
                    canHandleRequest: (topic) => {
                        return requestHandlers.some(itr => itr.topic === topic);
                    },
                    handleRequest: async (topic, payload) => {
                        const [handler] = requestHandlers.filter(itr => {
                            return itr.topic === topic;
                        });
                        const methodName = handler.methodName;
                        return self[methodName].call(self, payload);
                    }
                });
                // event listener
                (0, listeners_1.addBusEventListener)({
                    handleEvent: async (topic, payload) => {
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
    };
};
exports.BusListener = BusListener;
