import classnames from 'classnames';
import { AnyRecord, EmptyObjectOf, Nullable } from 'types/general';

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

export const getFlattenJson = (value: AnyRecord): AnyRecord => {
  return Object.entries(value).reduce(
    (acc, [k, v]) => (isNullOrUndefinedOrEmptyString(v) ? acc : { ...acc, [k]: v }),
    {},
  );
};

export const getRange = (count = 0): Array<number> => {
  return [...Array(count).keys()];
};

export const getLine = <T = undefined>(count = 0, fill?: T): Array<T> => {
  return getRange(count).map(() => fill as T);
};

export const cn = classnames;

export const replaceAll = (value: string, match: string, replace: string): string =>
  value.split(match).join(replace);
