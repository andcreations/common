"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
/** */
class HTTPError extends Error {
    /** */
    constructor(status, statusText, message) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.message = message;
    }
}
exports.HTTPError = HTTPError;
