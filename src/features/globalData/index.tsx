import { createContext, useContext, useEffect } from 'react';

import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useAuth } from 'features/auth';

import { User } from 'types/auth';
import { PaymentPlan } from 'types/payment';
import { isNumber } from 'utils/general';

interface GlobalState {
  user: User | null;
  userPlan: PaymentPlan | null;
  isNotValidBussinessCountByUser: (businessCount: number | undefined) => boolean;
  isNotValidPostsCountByBussines: (businessCount: number | undefined) => boolean;
}

const GlobalContext = createContext<GlobalState>({
  user: null,
  userPlan: null,
  isNotValidBussinessCountByUser: () => false,
  isNotValidPostsCountByBussines: () => false,
});

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, authData } = useAuth();

  const { getUserPaymentPlan } = useGetUserPaymentPlan();


  const handleCallWhenSignIn =() => {
    getUserPaymentPlan.fetch(undefined);
  }

  const handleCallWhenSignOut =() => {
    getUserPaymentPlan.reset();
  }
  
  useEffect(() => {
    (isAuthenticated ? handleCallWhenSignIn : handleCallWhenSignOut)();
  }, [isAuthenticated]);

  const userPlan = getUserPaymentPlan.data;

  const value: GlobalState = {
    user: authData?.user || null,
    userPlan,
    isNotValidBussinessCountByUser: (value) => {
      const { maxBussinessByUser } = userPlan || {};
      return isNumber(value) && isNumber(maxBussinessByUser) && value >= maxBussinessByUser;
    },
    isNotValidPostsCountByBussines: (value) => {
      const { maxPostsByBussiness } = userPlan || {};
      return isNumber(value) && isNumber(maxPostsByBussiness) && value >= maxPostsByBussiness;
    },
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
