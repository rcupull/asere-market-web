import { EmptyObjectOf, Nullable } from 'types/general';

export const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

export const isNullOrUndefinedOrEmptyString = (value: unknown): value is null | undefined | '' => {
  return isNullOrUndefined(value) || value === '';
};

export const compact = <T = any>(value: Array<Nullable<T>>): Array<T> => {
  return value.filter((val) => val) as Array<T>;
};

export const isEmpty = <T = object>(
  value: T | null | undefined,
): value is EmptyObjectOf<T> | null | undefined => {
  if (!value) return true;

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    return !keys.length;
  }

  return false;
};
