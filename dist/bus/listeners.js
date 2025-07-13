"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBusEvent = exports.handleBusRequest = exports.removeBusEventListener = exports.addBusEventListener = exports.removeBusRequestListener = exports.addBusRequestListener = void 0;
global.andcreations_BusRequestListeners = [];
global.andcreations_BusEventListeners = [];
/** */
function addBusRequestListener(listener) {
    andcreations_BusRequestListeners.push(listener);
}
exports.addBusRequestListener = addBusRequestListener;
/** */
function removeBusRequestListener(listener) {
    const index = andcreations_BusRequestListeners.findIndex(itr => {
        return itr === listener;
    });
    if (index !== -1) {
        andcreations_BusRequestListeners.splice(index, 1);
    }
}
exports.removeBusRequestListener = removeBusRequestListener;
/** */
function addBusEventListener(listener) {
    andcreations_BusEventListeners.push(listener);
}
exports.addBusEventListener = addBusEventListener;
/** */
function removeBusEventListener(listener) {
    const index = andcreations_BusEventListeners.findIndex(itr => {
        return itr === listener;
    });
    if (index !== -1) {
        andcreations_BusEventListeners.splice(index, 1);
    }
}
exports.removeBusEventListener = removeBusEventListener;
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
