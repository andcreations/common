/** */
export declare class HTTPError extends Error {
    readonly status: number;
    readonly statusText: string;
    readonly message: string;
    /** */
    constructor(status: number, statusText: string, message: string);
}
