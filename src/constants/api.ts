import { FetchResource, FetchStatus } from "../types/api";

export const dummyStatus: FetchStatus = {
  error: null,
  isBusy: false,
  isFailed: false,
  isNotStarted: true,
  isSuccess: false,
  wasCalled: false,
};

export const dummyFetchResource: FetchResource<any> = {
  fetch: () => {},
  status: dummyStatus,
};
