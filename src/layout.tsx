import { RootNavBar } from './components/nav-bar-root';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RootNavBar />
      {children}
    </>
  );
};
