"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusEventsHandlers = exports.getBusRequestHandlers = exports.addBusEventHandler = exports.addBusRequestHandler = void 0;
global.andcreations_BusRequestHandlers = [];
global.andcreations_BusEventHandlers = [];
/** */
function addBusRequestHandler(handler) {
    const hasHandler = andcreations_BusRequestHandlers.some(itr => {
        return itr.topic === handler.topic;
    });
    if (hasHandler) {
        throw Error(`Duplicated bus request handler of topic ${handler.topic}`);
    }
    andcreations_BusRequestHandlers.push(handler);
}
exports.addBusRequestHandler = addBusRequestHandler;
/** */
function addBusEventHandler(handler) {
    andcreations_BusEventHandlers.push(handler);
}
exports.addBusEventHandler = addBusEventHandler;
/** */
function getBusRequestHandlers(clazz) {
    return andcreations_BusRequestHandlers.filter(handler => {
        return handler.clazz === clazz;
    });
}
exports.getBusRequestHandlers = getBusRequestHandlers;
/** */
function getBusEventsHandlers(clazz) {
    return andcreations_BusEventHandlers.filter(handler => {
        return handler.clazz === clazz;
    });
}
exports.getBusEventsHandlers = getBusEventsHandlers;
