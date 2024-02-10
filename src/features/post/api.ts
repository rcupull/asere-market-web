import { useFetch } from 'hooks/useFetch';

import { FetchResource, FetchResourceWithPagination, PaginatedData } from 'types/api';
import { AnyRecord } from 'types/general';
import { Post } from 'types/post';
import { getEndpoint } from 'utils/api';
import { getPaginationResources } from 'utils/pagination';

export const usePostsApi = (): {
  getAll: FetchResourceWithPagination<{ routeNames?: Array<string>; filters?: AnyRecord }, Post>;
  getOne: FetchResource<{ id: string }, Post>;
} => {
  const [getAllData, getAllStatus, getAllFetch] = useFetch<PaginatedData<Post>>();
  const [getOneData, getOneStatus, getOneFetch] = useFetch<Post>();

  return {
    getAll: {
      ...getPaginationResources(getAllData),
      status: getAllStatus,
      fetch: ({ routeNames = [], filters = {} }, options = {}) => {
        getAllFetch(
          {
            method: 'get',
            url: getEndpoint({
              path: '/posts',
              params: { routeNames, ...filters },
            }),
          },
          options,
        );
      },
    },
    getOne: {
      data: getOneData,
      status: getOneStatus,
      fetch: ({ id }, options = {}) => {
        getOneFetch(
          {
            method: 'get',
            url: getEndpoint({
              path: '/posts/:id',
              urlParams: {
                id,
              },
            }),
          },
          options,
        );
      },
    },
  };
};
