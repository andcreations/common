"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBusEvent = exports.handleBusRequest = exports.addBusEventListener = exports.addBusRequestListener = void 0;
/** */
const requestListeners = [];
const eventListeners = [];
/** */
function addBusRequestListener(listener) {
    requestListeners.push(listener);
}
exports.addBusRequestListener = addBusRequestListener;
/** */
function addBusEventListener(listener) {
    eventListeners.push(listener);
}
exports.addBusEventListener = addBusEventListener;
/** */
async function handleBusRequest(topic, payload) {
    for (const listener of requestListeners) {
        if (listener.canHandleRequest(topic)) {
            return listener.handleRequest(topic, payload);
        }
    }
    throw new Error(`No bus request handler of topic ${topic}`);
}
exports.handleBusRequest = handleBusRequest;
/** */
async function handleBusEvent(topic, payload) {
    for (const listener of eventListeners) {
        await listener.handleEvent(topic, payload);
    }
}
exports.handleBusEvent = handleBusEvent;
