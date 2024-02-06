import { SideBar } from "./components/side-bar";

export interface DashboardProps{
  section: React.ReactNode
}

export const Dashboard = ({section}:DashboardProps): JSX.Element =>(
  <div className="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8">
    <SideBar />
    <div className="w-full">
      {section}
    </div>
  </div>
)
