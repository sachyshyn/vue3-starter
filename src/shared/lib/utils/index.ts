export function isNullish(value: any): value is null | undefined {
  return value === undefined || value === null;
}
