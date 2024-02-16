import { BrowserRouter } from 'react-router-dom';

import { ReduxProvider } from 'features/redux';

import { CookiesService } from './features/cookies';
import { ModalContainer } from './features/modal';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesService>
      <ReduxProvider>
        <BrowserRouter>
          <ModalContainer />
          {children}
        </BrowserRouter>
      </ReduxProvider>
    </CookiesService>
  );
};
