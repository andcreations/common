"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassStartMethodNames = exports.addStarter = void 0;
/** */
const starters = [];
/** */
function addStarter(starter) {
    starters.push(starter);
}
exports.addStarter = addStarter;
/** */
function getClassStartMethodNames(clazz) {
    return starters
        .filter(starter => starter.clazz === clazz)
        .map(starter => starter.methodName);
}
exports.getClassStartMethodNames = getClassStartMethodNames;
