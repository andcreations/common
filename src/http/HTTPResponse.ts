import { AxiosResponse } from 'axios';
import { HTTPError } from './HTTPError';

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
  export function toHTTPResponse<T>(
    response: AxiosResponse<string>
  ): HTTPResponse<T> {
    if (response.status < 200 || response.status >= 300) {
      throw new HTTPError(
        response.status,
        response.statusText,
        response.data.toString(),
      );
    }
    return {
      data: response.data.length ? JSON.parse(response.data) as T : null,
      status: response.status,
      statusText: response.statusText,
    };
  }