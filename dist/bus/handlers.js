"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusEventsHandlers = exports.getBusRequestHandlers = exports.addBusEventHandler = exports.addBusRequestHandler = void 0;
/** */
const requestHandlers = [];
const eventHandlers = [];
/** */
function addBusRequestHandler(handler) {
    const hasHandler = requestHandlers.some(itr => {
        return itr.topic === handler.topic;
    });
    if (hasHandler) {
        throw Error(`Duplicated bus request handler of topic ${handler.topic}`);
    }
    requestHandlers.push(handler);
}
exports.addBusRequestHandler = addBusRequestHandler;
/** */
function addBusEventHandler(handler) {
    eventHandlers.push(handler);
}
exports.addBusEventHandler = addBusEventHandler;
/** */
function getBusRequestHandlers(clazz) {
    return requestHandlers.filter(handler => {
        return handler.clazz === clazz;
    });
}
exports.getBusRequestHandlers = getBusRequestHandlers;
/** */
function getBusEventsHandlers(clazz) {
    return eventHandlers.filter(handler => {
        return handler.clazz === clazz;
    });
}
exports.getBusEventsHandlers = getBusEventsHandlers;
