/**
 * Filters out `null` or `undefined` values from an object.
 *
 * This generic function iterates over all properties of the provided object
 * and returns a new object that includes only those properties that are neither
 * `null` nor `undefined`. It's useful for preparing data before sending it to
 * APIs or for any other cases where you need to ensure only meaningful data is processed.
 *
 * @template T The type of the input object, which must extend an object type.
 * @param {T} data The object to be filtered.
 * @returns {Partial<T>} A new object with the same properties as the input object,
 * except those that were `null` or `undefined`.
 *
 * @example
 * interface MyDataType {
 *   id?: number | null;
 *   name?: string | undefined;
 *   email?: string;
 * }
 *
 * const myData: MyDataType = {
 *   id: null,
 *   name: 'Jane Doe',
 *   email: 'jane@example.com'
 * };
 *
 * const filteredData = filterNonNullFields(myData);
 * console.log(filteredData); // Output: { name: 'Jane Doe', email: 'jane@example.com' }
 */
export function filterNonNullFields<T extends object>(data: T): Partial<T> {
  const filteredData: Partial<T> = {};
  Object.keys(data).forEach((key) => {
    const typedKey = key as keyof T;
    if (data[typedKey] !== null && data[typedKey] !== undefined && typedKey !== '__typename') {
      filteredData[typedKey] = data[typedKey];
    }
  });
  return filteredData;
}
