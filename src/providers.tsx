import { GlobalProvider } from 'features/globalData';
import { ReduxProvider } from 'features/redux';

import { AuthProvider } from './features/auth';
import { CookiesService } from './features/cookies';
import { ModalProvider } from './features/modal';
import { RouterProvider } from './features/router';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesService>
      <ReduxProvider>
        <RouterProvider>
          <AuthProvider>
            <GlobalProvider>
              <ModalProvider>{children}</ModalProvider>
            </GlobalProvider>
          </AuthProvider>
        </RouterProvider>
      </ReduxProvider>
    </CookiesService>
  );
};
