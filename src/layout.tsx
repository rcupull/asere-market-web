import { RootNavBar } from './components/nav-bar-root';

import { LayoutMain } from 'pages/@common/layout-main';
import { SideBar } from 'pages/@common/side-bar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RootNavBar />
      <LayoutMain sideBar={<SideBar />}>{children}</LayoutMain>;
    </>
  );
};

