import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { SideBar } from "./components/side-bar";
import { getEndpoint } from "../../utils/api";

export interface DashboardProps {}

export const Admin = () => {
  const [, , handleCall] = useFetch();

  useEffect(() => {
    handleCall({
      method: "get",
      url: getEndpoint({ path: "/user" }),
    });
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <SideBar />
      <div>Admin</div>
    </div>
  );
};
