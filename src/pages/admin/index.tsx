

import { SideBar } from './components/side-bar';


export interface DashboardProps {}

export const Admin = () => {



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <SideBar />
      <div>Admin</div>
    </div>
  );
};
