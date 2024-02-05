import { AnyRecord } from "./general";

export type OnAfterSuccess<Data = any> = (reponse: Data) => void;
export type OnAfterFailed = (error: ApiError) => void;

export type FetchOptions<Data = any> = {
  onAfterSuccess?: OnAfterSuccess<Data>;
  onAfterFailed?: OnAfterFailed;
};

export interface FetchResource<Args = undefined, Data = any> {
  data: FetchData<Data>;
  fetch: (args: Args, options?: FetchOptions<Data>) => void;
  status: FetchStatus;
}

export type ApiStatus = "NOT_STARTED" | "BUSY" | "SUCCESS" | "FAILED";

export interface ApiError {
  message: string;
}

export type UrlParams = AnyRecord;
export type Headers = Record<string, string>;
export type Params = Record<
  string,
  string | number | boolean | undefined | Array<any>
>;

export type FetchMethod = "get" | "post" | "put" | "delete";

export type GetEndpoint = (args: {
  path: string;
  params?: Params;
  urlParams?: UrlParams;
}) => string;

export interface BasicFetchArgs {
  method: FetchMethod;
  url: string;
  data?: any;
  headers?: Headers;
  responseTransform?: (res: any) => any;
}

export interface FetchArgs extends BasicFetchArgs {
  params?: Params;
  urlParams?: UrlParams;
}

export type AmplifyParams = BasicFetchArgs;

export type FetchStatus = {
  isBusy: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  isNotStarted: boolean;
  error: ApiError | null;
  wasCalled: boolean;
};

export type FetchData<Data = unknown> = Data | null;
