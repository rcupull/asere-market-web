import qs from "query-string";

import { isEmpty, isNullOrUndefined } from "./general";
import { GetEndpoint, Params, UrlParams } from "../types/api";

export const paramsSerializer = (params: Params): string =>
  qs.stringify(params, { arrayFormat: "comma" });

export const apiErrorsMesages = {
  networkError: "Network Error",
  incorrectUsernameOrPassword: "Incorrect username or password.",
  userNotAutorized:
    "PreAuthentication failed with error Usted no tiene acceso a los recursos de esta aplicación.",
};

export const injectUrlParams = (
  url: string,
  urlParams: UrlParams = {}
): string => {
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
  params,
  urlParams,
}: {
  path: string;
  params?: Params;
  urlParams?: UrlParams;
}): string => {
  const flattenPath = injectUrlParams(path, urlParams);

  const getFlattenParams = (value: Params): Params =>
    Object.entries(value).reduce((acc, [k, v]) => {
      if (isNullOrUndefined(v)) return acc;
      return { ...acc, [k]: v };
    }, {});

  const flattenParams = params && getFlattenParams(params);

  if (isEmpty(flattenParams)) {
    return flattenPath;
  }

  return `${flattenPath}?${paramsSerializer(flattenParams)}`;
};

export const getEndpoint: GetEndpoint = ({ path, params, urlParams }) => {
  const flattenPath = fillPath({
    path,
    params,
    urlParams,
  });

  return `http://localhost:4009${flattenPath}`;
};
