import { HTTPParams } from './HTTPParams';
/** */
export declare class URLBuilder {
    /** */
    static buildQueryParams(queryParams?: HTTPParams): string;
    /** */
    static appendQueryParam(queryParamsStr: string, name: string, value: string): string;
    /** */
    static build(urlPath: string, queryParams?: HTTPParams): string;
}
