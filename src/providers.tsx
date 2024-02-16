import { ReduxProvider } from 'features/redux';

import { CookiesService } from './features/cookies';
import { ModalContainer } from './features/modal';
import { RouterProvider } from './features/router';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesService>
      <ReduxProvider>
        <RouterProvider>
          <ModalContainer />
          {children}
        </RouterProvider>
      </ReduxProvider>
    </CookiesService>
  );
};
