/** */
export function alignLeft(str: string, width: number): string {
  let result = str;
  while (result.length < width) {
    result = result + ' ';
  }
  return result;
}

/** */
export function alignRight(str: string, width: number): string {
  let result = str;
  while (result.length < width) {
    result = ' ' + result;
  }
  return result;
}
