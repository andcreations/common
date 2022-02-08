"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHTTPResponse = void 0;
const HTTPError_1 = require("./HTTPError");
/** */
function toHTTPResponse(response) {
    if (response.status < 200 || response.status >= 300) {
        throw new HTTPError_1.HTTPError(response.status, response.statusText, response.data.toString());
    }
    return {
        data: JSON.parse(response.data),
        status: response.status,
        statusText: response.statusText,
    };
}
exports.toHTTPResponse = toHTTPResponse;
