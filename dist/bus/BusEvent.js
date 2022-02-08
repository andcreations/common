"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusEvent = void 0;
const handlers_1 = require("./handlers");
/** */
const BusEvent = (topic) => {
    return (target, propertyKey, descriptor) => {
        (0, handlers_1.addBusEventHandler)({
            clazz: target.constructor,
            methodName: propertyKey,
            topic,
        });
        return descriptor;
    };
};
exports.BusEvent = BusEvent;
