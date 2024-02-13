import { useEffect, useState } from 'react';

import { useAuth } from 'features/auth';

import { useDebouncedValue } from 'hooks/useDebouncedValue';

import axios from 'axios';
import {
  ApiError,
  ApiStatus,
  FetchData,
  FetchMethod,
  FetchStatus,
  Headers,
  OnAfterFailed,
  OnAfterSuccess,
} from 'types/api';
import { AnyRecord } from 'types/general';

export type FetchOptions<Data = any> = {
  onAfterSuccess?: OnAfterSuccess<Data>;
  onAfterFailed?: OnAfterFailed;
  persistent?: boolean;
};

export type FetchFnReset = () => void;

interface FetchFnCallArgs {
  method: FetchMethod;
  url: string;
  data?: any;
  headers?: Headers;
}

export type FetchFnCall<Data = unknown> = (
  args?: FetchFnCallArgs | Array<FetchFnCallArgs>,
  options?: Omit<FetchOptions<Data>, 'fetchWhenMount'>,
) => void;
export type UseFetchReturn<Data = unknown> = [
  FetchData<Data>,
  FetchStatus,
  FetchFnCall<Data>,
  FetchFnReset,
];

const persistentRecord: AnyRecord = {};

export const useFetch = <Data = any>(dataId: string): UseFetchReturn<Data> => {
  const [response, setResponse] = useState<FetchData<Data>>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<ApiStatus>('NOT_STARTED');
  const [wasCalled, setWasCalled] = useState<boolean>(false);

  const { authData } = useAuth();

  const debouncedStatus = useDebouncedValue<ApiStatus>(status, 100);

  useEffect(() => {
    if (debouncedStatus === 'SUCCESS') {
      setStatus('NOT_STARTED');
    }
  }, [debouncedStatus]);

  const handleReset = () => {
    setResponse(null);
    setError(null);
    setStatus('NOT_STARTED');
    setWasCalled(false);
  };

  const handleFetch: FetchFnCall<Data> = async (args, options) => {
    if (!args) throw new Error('Should set some fetch args');

    const { onAfterSuccess, onAfterFailed, persistent } = options || {};

    try {
      setStatus('BUSY');

      const resourcesArray = args instanceof Array ? args : [args];

      const promises = resourcesArray.map(({ method, url, data, headers = {} }) => {
        return axios({
          url,
          method,
          data,
          headers: {
            ...headers,
            token: authData?.token,
          },
        });
      });

      const responseArray = await Promise.all(promises);

      const response = (
        args instanceof Array ? responseArray.map(({ data }) => data) : responseArray[0].data
      ) as Data;

      if (persistent && dataId) {
        persistentRecord[dataId] = response;
      }

      setResponse(response);
      onAfterSuccess?.(response);
      setStatus('SUCCESS');
      setWasCalled(true);
    } catch (e) {
      onAfterFailed?.(e as ApiError);
      setResponse(null);
      setError(e as ApiError);
      setStatus('FAILED');
      setWasCalled(true);
    }
  };

  return [
    persistentRecord[dataId] || response,
    {
      isNotStarted: status === 'NOT_STARTED',
      isBusy: status === 'BUSY',
      isFailed: status === 'FAILED',
      isSuccess: status === 'SUCCESS',
      error,
      wasCalled,
    },
    handleFetch,
    handleReset,
  ];
};
