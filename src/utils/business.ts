import { replaceAll } from './general';

import { BusinessCategory } from 'types/business';

export const getRouteName = (name: string): string => {
  let out = name.trim().toLowerCase();
  out = replaceAll(out, ' ', '-');
  out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
  return out;
};

export const getPostCategoryTag = (label: string): string => {
  let out = label.trim().toLowerCase();
  out = replaceAll(out, ' ', '_');
  out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
  return out;
};

export const getBusinessCategoryLabel = (category: BusinessCategory): string => {
  const record: Record<BusinessCategory, string> = {
    food: 'Comida',
    clothing: 'Vestuario',
    service: 'Servicios',
    tool: 'Herramientas',
  };

  return record[category];
};

export const getPostRoute = (args: { routeName: string; postId: string }) => {
  return `/${args.routeName}/${args.postId}`;
};

export const getBusinessRoute = (args: { routeName: string }) => {
  return `/${args.routeName}`;
};
