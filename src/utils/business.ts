import { replaceAll } from './general';

export const getRouteName = (name: string): string => {
  let out = name.trim().toLowerCase();
  out = replaceAll(out, ' ', '-');
  out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
  return out;
};
