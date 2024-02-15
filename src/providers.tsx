import { ReduxProvider } from 'features/redux';

import { CookiesService } from './features/cookies';
import { ModalProvider } from './features/modal';
import { RouterProvider } from './features/router';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesService>
      <ReduxProvider>
        <RouterProvider>
          <ModalProvider>{children}</ModalProvider>
        </RouterProvider>
      </ReduxProvider>
    </CookiesService>
  );
};
