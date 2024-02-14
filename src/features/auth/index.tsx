import { createContext, useContext, useState } from 'react';

import { cookiesUtils } from 'features/cookies';

import { useFetch } from 'hooks/useFetch';

import { dummyFetchResource } from 'constants/api';
import { FetchResource } from 'types/api';
import { AuthData } from 'types/auth';
import { getEndpoint } from 'utils/api';

interface AuthState {
  authData: AuthData | null;
  onSignIn: FetchResource<{ email: string; password: string }, AuthData>;
  onSignUp: FetchResource<{ email: string; password: string; name: string }>;
  onSignOut: FetchResource;
  onValidate: FetchResource<{ email: string; code: string }>;
  isAdmin: boolean;
  isUser: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthState>({
  authData: null,
  onSignUp: dummyFetchResource,
  onSignIn: dummyFetchResource,
  onSignOut: dummyFetchResource,
  onValidate: dummyFetchResource,
  isAdmin: false,
  isUser: false,
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData | null>(
    (cookiesUtils.getCookie('authData') as AuthData) || null,
  );

  const [singInData, singInStatus, fetchSignIn, singInReset] = useFetch<AuthData>();
  const [singUpData, singUpStatus, fetchSignUp, singUpReset ] = useFetch();
  const [singOutData, singOutStatus, fetchSignOut, singOutReset ] = useFetch();
  const [validateData, validateStatus, fetchValidate, validateReset] = useFetch();

  const value: AuthState = {
    isAuthenticated: !!authData,
    isAdmin: authData?.user?.role === 'admin',
    isUser: authData?.user?.role === 'user',
    authData,
    onValidate: {
      data: validateData,
      status: validateStatus,
      fetch: ({ code, email }, options = {}) => {
        fetchValidate(
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/validate' }),
            data: { code, email },
          },
          options,
        );
      },
      reset: validateReset,
    },
    onSignUp: {
      data: singUpData,
      status: singUpStatus,
      fetch: ({ email, name, password }, options = {}) => {
        fetchSignUp(
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-up' }),
            data: { email, password, name },
          },
          options,
        );
      },
      reset: singUpReset,
    },
    onSignIn: {
      data: singInData,
      status: singInStatus,
      fetch: ({ email, password }, options = {}) => {
        fetchSignIn(
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-in' }),
            data: { email, password },
          },
          {
            ...options,
            onAfterSuccess: (response) => {
              cookiesUtils.setCookie('authData', response);
              setAuthData(response);

              options?.onAfterSuccess?.(response);
            },
          },
        );
      },
      reset: singInReset,
    },
    onSignOut: {
      data: singOutData,
      status: singOutStatus,
      fetch: (_, options) => {
        const { token } = authData || {};

        if (!token) {
          console.log('has no token');
          return;
        }

        fetchSignOut(
          {
            method: 'post',
            url: getEndpoint({ path: '/auth/sign-out' }),
            data: { token },
          },
          {
            ...options,
            onAfterSuccess: (response) => {
              cookiesUtils.removeCookie('authData');
              setAuthData(null);

              options?.onAfterSuccess?.(response);
            },
          },
        );
      },
      reset: singOutReset,
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
