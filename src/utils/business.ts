import { replaceAll } from './general';

import { BusinessCategory, SearchLayoutType } from 'types/business';

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

export const getDashboardBusinessRoute = (args: { routeName: string }) => {
  return `/dashboard/business/${args.routeName}`;
};

export const getDashboardRoute = () => {
  return `/dashboard`;
};

export const getSearchLayoutLabel = (type: SearchLayoutType): string => {
  switch (type) {
    case 'none':
      return 'Ninguno';
    case 'left':
      return 'Isquierda';
    case 'center':
      return 'Centrado';
    case 'right':
      return 'Derecha';
    case 'postCategories':
      return 'Categorías(seleccion múltiple)';
    case 'postCategoriesScrollable':
      return 'Categorías(seleccion múltiple y deslizables)';
    case 'postCategoriesExcluded':
      return 'Categorías(seleccion simple)';
    case 'postCategoriesExcludedScrollable':
      return 'Categorías(selección simple y deslizable)';
    default:
      return 'unknown category';
  }
};
