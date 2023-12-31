type MapValuesToKeysIfAllowed<T> = {
  [K in keyof T]: T[K] extends PropertyKey ? K : never;
};

type Filter<T> = MapValuesToKeysIfAllowed<T>[keyof T];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dictionary<T extends Record<PropertyKey, any>, Key extends Filter<T> = Filter<T>> = {
  [K in T[Key]]: (T & { [key in Key]: K })[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const groupBy = <T extends Record<PropertyKey, any>, Key extends Filter<T>>(
  arr: T[],
  key: Key,
): Dictionary<T> =>
  arr.reduce((accumulator, val) => {
    const groupedKey = val[key];
    if (!accumulator[groupedKey]) {
      accumulator[groupedKey] = [];
    }
    // @ts-expect-error -- need to figure out to satisfy this typing
    accumulator[groupedKey].push(val);
    return accumulator;
  }, {} as Dictionary<T>);
