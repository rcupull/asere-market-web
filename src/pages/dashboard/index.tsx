import { SideBar } from './components/side-bar';

import { LayoutDashboard } from 'pages/@common/layout-dashboard';

export interface DashboardProps {
  section: React.ReactNode;
}

export const Dashboard = ({ section }: DashboardProps): JSX.Element => (
  <LayoutDashboard sideBar={<SideBar />}>{section}</LayoutDashboard>
);
