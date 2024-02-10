import { createContext, useContext } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';

import { queryToSearch, searchToQuery } from './utils';

import { Query } from 'types/api';

interface RouterState {
  pushRoute: (route: string) => void;
  pathname: string;
  query: Query;
  onChangeQuery: (
    partialQuery: Query,
    options?: {
      timeout?: number;
    },
  ) => void;
}

const RouterContext = createContext<RouterState>({
  pushRoute: () => {},
  pathname: '/',
  query: {},
  onChangeQuery: () => {},
});

export const useRouter = () => useContext(RouterContext);

const RouterProviderBase = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const query = searchToQuery(search.slice(1)) as Query;

  const onChangeQuery: RouterState['onChangeQuery'] = (newQuery, options) => {
    const { timeout } = options || {};
    const handle = () => {
      navigate({
        pathname: pathname,
        search: queryToSearch({ ...query, ...newQuery }),
      });
    };
    if (timeout) {
      setTimeout(handle, timeout);
      return;
    }
    handle();
  };

  const value: RouterState = {
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

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <RouterProviderBase>{children}</RouterProviderBase>
    </BrowserRouter>
  );
};
