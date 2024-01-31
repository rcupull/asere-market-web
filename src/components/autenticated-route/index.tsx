import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth";
import {  UserRoleT } from "../../types/auth";

export interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: Array<UserRoleT>
}
export const AuthenticatedRoute = ({ children, roles }: PrivateRouteProps) => {
  const { authData } = useAuth();

  const role = authData?.user?.role;

  if (!authData) {
    return <Navigate to="/sign-in" />;
  }

  if(role && roles?.length && !roles.includes(role)){
    return <Navigate to="/not-found" />;
  }

  return <>{children}</>;
};

export const withAuthenticatedRoute = (element: React.ReactNode, roles?: Array<UserRoleT>) => (
  <AuthenticatedRoute roles={roles}>
    {element}
  </AuthenticatedRoute>
);