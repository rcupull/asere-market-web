import { createContext, useContext } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';

interface RouterState {
  pushRoute: (route: string) => void;
  pathname: string;
}

const RouterContext = createContext<RouterState>({
  pushRoute: () => {},
  pathname: '/',
});

export const useRouter = () => useContext(RouterContext);

const RouterProviderBase = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const value: RouterState = {
    pathname,
    pushRoute: (route) => {
      navigate(route);
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
