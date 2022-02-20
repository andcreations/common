"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alignRight = exports.alignLeft = void 0;
/** */
function alignLeft(str, width) {
    let result = str;
    while (result.length < width) {
        result = result + ' ';
    }
    return result;
}
exports.alignLeft = alignLeft;
/** */
function alignRight(str, width) {
    let result = str;
    while (result.length < width) {
        result = ' ' + result;
    }
    return result;
}
exports.alignRight = alignRight;
