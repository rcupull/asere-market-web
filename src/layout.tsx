import { RootNavBar } from './components/nav-bar-root';
import { Providers } from './providers';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <RootNavBar />
      {children}
    </Providers>
  );
};
