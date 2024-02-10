import { DashboardSideBar } from './components/dashboard-side-bar';

import { LayoutDashboard } from 'pages/@common/layout-dashboard';

export interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard = ({ children }: DashboardProps): JSX.Element => (
  <LayoutDashboard sideBar={<DashboardSideBar />}>{children}</LayoutDashboard>
);
