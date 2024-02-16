import { useLocation, useNavigate } from 'react-router-dom';

import { queryToSearch, searchToQuery } from './utils';

import { Query } from 'types/api';
import { getFlattenJson } from 'utils/general';

interface UseRouterReturn {
  pushRoute: (route: string) => void;
  onBack: () => void;
  pathname: string;
  query: Query;
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
    onBack: () => navigate(-1),
    query,
    onChangeQuery,
    pathname,
    pushRoute: (pathname) => {
      navigate({
        pathname,
        search,
      });
    },
  };
};
