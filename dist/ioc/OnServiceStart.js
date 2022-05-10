"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnServiceStart = void 0;
const starters_1 = require("./starters");
/** */
const OnServiceStart = () => {
    return (target, propertyKey, descriptor) => {
        (0, starters_1.addStarter)({
            clazz: target.constructor,
            methodName: propertyKey,
        });
        return descriptor;
    };
};
exports.OnServiceStart = OnServiceStart;
