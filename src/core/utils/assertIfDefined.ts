export function assertIfDefined<TValue>(
  value: TValue,
): asserts value is NonNullable<TValue> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`)
  }
}
