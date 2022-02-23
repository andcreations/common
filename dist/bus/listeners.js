"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBusEvent = exports.handleBusRequest = exports.addBusEventListener = exports.addBusRequestListener = void 0;
global.andcreations_BusRequestListeners = [];
global.andcreations_BusEventListeners = [];
/** */
function addBusRequestListener(listener) {
    andcreations_BusRequestListeners.push(listener);
}
exports.addBusRequestListener = addBusRequestListener;
/** */
function addBusEventListener(listener) {
    andcreations_BusEventListeners.push(listener);
}
exports.addBusEventListener = addBusEventListener;
/** */
async function handleBusRequest(topic, payload) {
    for (const listener of andcreations_BusRequestListeners) {
        if (listener.canHandleRequest(topic)) {
            return listener.handleRequest(topic, payload);
        }
    }
    throw new Error(`No bus request handler of topic ${topic}`);
}
exports.handleBusRequest = handleBusRequest;
/** */
async function handleBusEvent(topic, payload) {
    for (const listener of andcreations_BusEventListeners) {
        await listener.handleEvent(topic, payload);
    }
}
exports.handleBusEvent = handleBusEvent;
