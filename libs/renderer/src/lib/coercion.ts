export function coerceNumber(value: string | undefined): number | undefined;
export function coerceNumber(
  value: string | undefined,
  fallbackValue: number
): number;
export function coerceNumber(
  value: string | undefined,
  fallbackValue?: number
): number | undefined {
  const numberValue = Number(value);
  return !isNaN(numberValue) ? numberValue : fallbackValue;
}

export function coerceArray<T>(value: T | T[]): T[] {
  return ([] as T[]).concat(value);
}
