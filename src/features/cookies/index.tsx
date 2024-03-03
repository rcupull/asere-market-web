import React, { useRef } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

type UseCookies = typeof useCookies;

interface CookiesUtils {
  getCookie: (key: string) => ReturnType<UseCookies>[0];
  getCookies: () => ReturnType<UseCookies>[0];
  setCookie: ReturnType<UseCookies>[1];
  removeCookie: ReturnType<UseCookies>[2];
}

export const cookiesUtils: CookiesUtils = {
  setCookie: () => {
    console.log('calling default setCookie');
    /**NOP */
  },
  getCookie: () => {
    console.log('calling default getCookie');
    /**NOP */
  },
  getCookies: () => {
    console.log('calling default getCookies');
    /**NOP */
  },
  removeCookie: () => {
    console.log('calling default removeCookie');
    /**NOP */
  },
};

interface CookiesServiceProps {
  children: React.ReactNode;
}

export const CookiesService = ({ children }: CookiesServiceProps): JSX.Element => {
  const args = useCookies();

  const useCookiesPersistent = useRef(args);
  useCookiesPersistent.current = args;

  const setCookie: CookiesUtils['setCookie'] = (name, value, options = {}) => {
    const [, setCookie] = useCookiesPersistent.current;

    setCookie(name, value, {
      path: '/',
      ...options,
    });
  };

  const getCookie: CookiesUtils['getCookie'] = (key) => {
    const [cookies] = useCookiesPersistent.current;
    return cookies[key];
  };

  const getCookies: CookiesUtils['getCookies'] = () => {
    const [cookies] = useCookiesPersistent.current;
    return cookies;
  };

  const removeCookie: CookiesUtils['removeCookie'] = (...args) => {
    const [, , removeCookie] = useCookiesPersistent.current;
    removeCookie(...args);
  };

  cookiesUtils.setCookie = setCookie;
  cookiesUtils.getCookie = getCookie;
  cookiesUtils.getCookies = getCookies;
  cookiesUtils.removeCookie = removeCookie;

  return (
    <CookiesProvider
      defaultSetOptions={{
        path: '/',
      }}
    >
      {children}
    </CookiesProvider>
  );
};
