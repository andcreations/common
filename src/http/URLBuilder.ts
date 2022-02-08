import { HTTPParams } from './HTTPParams';

/** */
export class URLBuilder {
  /** */
  static buildQueryParams(queryParams?: HTTPParams): string {
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
  static appendQueryParam(
    queryParamsStr: string,
    name: string,
    value: string
  ): string {
    const separator = queryParamsStr.length > 0 ? '&': '?';
    return `${queryParamsStr}${separator}${name}=${value}`;
  }

  /** */
  static build(urlPath: string, queryParams?: HTTPParams): string {
    return encodeURI(`${urlPath}${URLBuilder.buildQueryParams(queryParams)}`);
  }
}