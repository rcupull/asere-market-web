import { Navigate } from 'react-router-dom';

import { useAuth } from 'features/api-slices/useAuth';

import { UserRole } from 'types/auth';
import { ChildrenProp } from 'types/general';

export const AutenticatedRole = ({
  children,
  roles,
}: ChildrenProp & { roles: Array<UserRole> }) => {
  const { authData } = useAuth();

  const role = authData?.user?.role;

  if (!authData) {
    return <Navigate to="/auth/sign-in" />;
  }

  if (role && roles?.length && !roles.includes(role)) {
    return <Navigate to="/not-found" />;
  }

  return <>{children}</>;
};
