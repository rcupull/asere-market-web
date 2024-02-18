import { Navigate } from 'react-router-dom';

import { useAuthSignIn } from 'features/api/useAuthSignIn';

import { UserRole } from 'types/auth';
import { ChildrenProp } from 'types/general';

export const AutenticatedRole = ({
  children,
  roles,
}: ChildrenProp & { roles: Array<UserRole> }) => {
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
