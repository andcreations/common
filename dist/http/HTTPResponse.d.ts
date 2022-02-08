import { AxiosResponse } from 'axios';
/** */
export interface HTTPResponse<T> {
    /** Data from the backend. */
    data: T;
    /** HTTP status. */
    status: number;
    /** HTTP status text. */
    statusText: string;
}
/** */
export declare function toHTTPResponse<T>(response: AxiosResponse<string>): HTTPResponse<T>;
