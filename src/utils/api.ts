import { isEmpty, isNullOrUndefined } from './general';

import qs from 'query-string';
import { GetEndpoint, Query, UrlParams } from 'types/api';

export const paramsSerializer = (query: Query): string =>
  qs.stringify(query, { arrayFormat: 'comma' });

export const apiErrorsMesages = {
  networkError: 'Network Error',
  incorrectUsernameOrPassword: 'Incorrect username or password.',
  userNotAutorized:
    'PreAuthentication failed with error Usted no tiene acceso a los recursos de esta aplicación.',
};

const prodUrl = 'http://192.241.145.70';
const stageUrl = 'http://192.241.145.70:8080';
const devUrl = 'http://localhost:4009';

export const injectUrlParams = (url: string, urlParams: UrlParams = {}): string => {
  let filledUrl = url;

  Object.entries(urlParams).forEach(([key, value]) => {
    const pattern = `:${key}`;
    if (filledUrl.includes(pattern) && value !== undefined) {
      filledUrl = filledUrl.replace(pattern, value.toString());
    }
  });

  return filledUrl;
};

export const fillPath = ({
  path,
  query,
  urlParams,
}: {
  path: string;
  query?: Query;
  urlParams?: UrlParams;
}): string => {
  const flattenPath = injectUrlParams(path, urlParams);

  const getFlattenParams = (value: Query): Query =>
    Object.entries(value).reduce((acc, [k, v]) => {
      if (isNullOrUndefined(v)) return acc;
      return { ...acc, [k]: v };
    }, {});

  const flattenParams = query && getFlattenParams(query);

  if (isEmpty(flattenParams)) {
    return flattenPath;
  }

  return `${flattenPath}?${paramsSerializer(flattenParams)}`;
};

export const getEndpoint: GetEndpoint = ({ path, query, urlParams }) => {
  const flattenPath = fillPath({
    path,
    query,
    urlParams,
  });

  if (STAGING) {
    return `${stageUrl}/api${flattenPath}`;
  }

  if (PRODUCTION) {
    return `${prodUrl}/api${flattenPath}`;
  }

  return `${devUrl}/api${flattenPath}`;
};

export const getImageEndpoint = (src: string) => {
  if (src.startsWith('http')) {
    return src;
  }

  if (STAGING) {
    return `${stageUrl}${src}`;
  }

  if (PRODUCTION) {
    return `${prodUrl}${src}`;
  }

  return `${devUrl}${src}`;
};
