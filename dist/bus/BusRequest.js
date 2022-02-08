"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRequest = void 0;
const handlers_1 = require("./handlers");
/** */
const BusRequest = (topic) => {
    return (target, propertyKey, descriptor) => {
        (0, handlers_1.addBusRequestHandler)({
            clazz: target.constructor,
            methodName: propertyKey,
            topic,
        });
        return descriptor;
    };
};
exports.BusRequest = BusRequest;
