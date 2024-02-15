import { Navigate } from 'react-router-dom';

import { useAuthSignIn } from 'features/api/useAuthSignIn';

import { UserRole } from 'types/auth';

export interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: Array<UserRole>;
}
export const AuthenticatedRoute = ({ children, roles }: PrivateRouteProps) => {
  const { authData } = useAuthSignIn();

  const role = authData?.user?.role;

  if (!authData) {
    return <Navigate to="/sign-in" />;
  }

  if (role && roles?.length && !roles.includes(role)) {
    return <Navigate to="/not-found" />;
  }

  return <>{children}</>;
};

export const withAuthenticatedRoute = (element: React.ReactNode, roles?: Array<UserRole>) => (
  <AuthenticatedRoute roles={roles}>{element}</AuthenticatedRoute>
);
