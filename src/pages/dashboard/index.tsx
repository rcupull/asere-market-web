import { useEffect } from 'react';

import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';

import { DashboardSideBar } from './components/dashboard-side-bar';

import { LayoutDashboard } from 'pages/@common/layout-dashboard';

export interface DashboardProps {
  children: React.ReactNode;
}



export const Dashboard = ({ children }: DashboardProps): JSX.Element => {

  const {getUserPaymentPlan} = useGetUserPaymentPlan();

  useEffect(()=>{
    getUserPaymentPlan.fetch(undefined, {persistent: true });
  },[])



  return (
    <LayoutDashboard sideBar={<DashboardSideBar />}>{children}</LayoutDashboard>
  );
}
