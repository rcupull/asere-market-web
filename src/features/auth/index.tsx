import { createContext, useContext, useState } from "react";
import { AuthData } from "../../types/auth";
import { FetchResource } from "../../types/api";
import { dummyFetchResource } from "../../constants/api";
import { useFetch } from "../../hooks/useFetch";
import { getEndpoint } from "../../utils/api";
import { cookiesUtils } from "../cookies";

interface AuthState {
  authData: AuthData | null;
  onSignIn: FetchResource<{ email: string; password: string }, AuthData>;
  onSignUp: FetchResource<{ email: string; password: string; name: string }>;
  onSignOut: FetchResource;
  onValidate: FetchResource<{email: string; code: string }>;
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
  isAuthenticated:false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData | null>(
    (cookiesUtils.getCookie("authData") as AuthData) || null
  );

  const [, singInStatus, fetchSignIn] = useFetch<AuthData>();
  const [, singUpStatus, fetchSignUp] = useFetch();
  const [, singOutStatus, fetchSignOut] = useFetch();
  const [, validateStatus, fetchValidate] = useFetch();

  const value: AuthState = {
    isAuthenticated: !!authData,
    isAdmin: authData?.user?.role === "admin",
    isUser: authData?.user?.role === "user",
    authData,
    onValidate: {
      status: validateStatus,
      fetch: ({ code, email }, options = {}) => {
        fetchValidate(
          {
            method: "post",
            url: getEndpoint({ path: "/auth/validate" }),
            data: { code, email },
          },
          options
        );
      },
    },
    onSignUp: {
      status: singUpStatus,
      fetch: ({ email, name, password }, options = {}) => {
        fetchSignUp(
          {
            method: "post",
            url: getEndpoint({ path: "/auth/sign-up" }),
            data: { email, password, name },
          },
          options
        );
      },
    },
    onSignIn: {
      status: singInStatus,
      fetch: ({ email, password }, options = {}) => {
        fetchSignIn(
          {
            method: "post",
            url: getEndpoint({ path: "/auth/sign-in" }),
            data: { email, password },
          },
          {
            ...options,
            onAfterSuccess: (response) => {
              const { data } = response
              
              cookiesUtils.setCookie("authData", data);
              setAuthData(data);

              options?.onAfterSuccess?.(response);
            },
          }
        );
      },
    },
    onSignOut: {
      status: singOutStatus,
      fetch: (_, options) => {
        const { token } = authData || {}

        if(!token){
          console.log("has no token");
          return 
        }

        fetchSignOut(
          {
            method: "post",
            url: getEndpoint({ path: "/auth/sign-out" }),
            data: { token },
          },
          {
            ...options,
            onAfterSuccess: (response) => {

              cookiesUtils.removeCookie("authData");
              setAuthData(null);

              options?.onAfterSuccess?.(response);
            },
          }
        );
      },
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
