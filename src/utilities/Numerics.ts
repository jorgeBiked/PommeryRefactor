
export function isNumeric(value: string): boolean {
  let n = Number(value);
  return isNaN(n) ? false : true;
}
