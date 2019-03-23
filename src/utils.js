import {
  camelCase, forOwn, isArray, isPlainObject, snakeCase,
} from 'lodash';

const deepMapKeys = (obj, fn) => {
  const x = {};

  forOwn(obj, (value, key) => {
    let tempValue = value;
    if (isPlainObject(tempValue)) {
      tempValue = deepMapKeys(tempValue, fn);
    } else if (isArray(tempValue)) {
      tempValue = tempValue.map(
        val => (isPlainObject(val) ? deepMapKeys(val, fn) : val)
      );
    }
    x[fn(key)] = tempValue;
  });

  return x;
}

// Converts all keys in an object to camel/snake case.
export const keysToCamel = obj => deepMapKeys(obj, camelCase);
export const keysToSnake = obj => deepMapKeys(obj, snakeCase);
