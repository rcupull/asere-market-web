export type AnyRecord = Record<string, any>;

export type Nullable<T> = T | false | null | undefined;

type EmptyObject<T> = { [K in keyof T]?: never };
export type EmptyObjectOf<T> = EmptyObject<T> extends T
  ? EmptyObject<T>
  : never;
