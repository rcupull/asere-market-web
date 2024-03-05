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

export const getInitials = (fullname: string) => {
  const names = fullname.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
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
