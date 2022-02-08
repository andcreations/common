/** */
export class HTTPError extends Error {
  /** */
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly message: string
  ) {
    super(message);
  }
}