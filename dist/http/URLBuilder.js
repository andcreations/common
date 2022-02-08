"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLBuilder = void 0;
/** */
class URLBuilder {
    /** */
    static buildQueryParams(queryParams) {
        if (!queryParams) {
            return '';
        }
        const names = Object.keys(queryParams);
        if (!names.length) {
            return '';
        }
        return names
            .filter((name) => {
            return queryParams[name] != null;
        })
            .map((name, index) => {
            const separator = index ? '&' : '?';
            return `${separator}${name}=${queryParams[name]}`;
        })
            .join('');
    }
    /** */
    static appendQueryParam(queryParamsStr, name, value) {
        const separator = queryParamsStr.length > 0 ? '&' : '?';
        return `${queryParamsStr}${separator}${name}=${value}`;
    }
    /** */
    static build(urlPath, queryParams) {
        return encodeURI(`${urlPath}${URLBuilder.buildQueryParams(queryParams)}`);
    }
}
exports.URLBuilder = URLBuilder;
