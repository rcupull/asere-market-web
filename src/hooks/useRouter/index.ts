import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { queryToSearch, searchToQuery } from './utils';

import { Query } from 'types/api';
import { AnyRecord } from 'types/general';
import { getFlattenJson } from 'utils/general';

interface UseRouterReturn {
  pushRoute: (route: string, query?: AnyRecord) => void;
  onBack: () => void;
  queryToSearch: (query: Query) => void;
  pathname: string;
  query: Query;
  search: string;
  params: Record<string, string | undefined>;
  onChangeQuery: (
    partialQuery: Query,
    options?: {
      timeout?: number;
    },
  ) => void;
}

export const useRouter = (): UseRouterReturn => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const params = useParams();
  const query = searchToQuery(search.slice(1)) as Query;

  const onChangeQuery: UseRouterReturn['onChangeQuery'] = (newQuery, options) => {
    const { timeout } = options || {};
    const handle = () => {
      const updatedQuery = getFlattenJson({ ...query, ...newQuery });

      navigate({
        pathname: pathname,
        search: queryToSearch(updatedQuery),
      });
    };

    if (timeout) {
      setTimeout(handle, timeout);
      return;
    }
    handle();
  };

  return {
    params,
    search,
    queryToSearch,
    onBack: () => navigate(-1),
    query,
    onChangeQuery,
    pathname,
    pushRoute: (pathname, query) => {
      navigate(`${pathname}${query ? `?${queryToSearch(query)}` : ''}`);
    },
  };
};
