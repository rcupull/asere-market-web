import { queryToSearch } from 'hooks/useRouter/utils';

import { deepJsonCopy, isNumber, replaceAll } from './general';

import { Business, BusinessCategory, SearchLayoutType } from 'types/business';
import { Post } from 'types/post';
import { Sale } from 'types/sales';

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

export const getSalesRoute = (args: { routeName: string }) => {
  return `/${args.routeName}/sales`;
};
export const getSaleRoute = (args: { routeName: string; saleId: string }) => {
  return `/${args.routeName}/sales/${args.saleId}`;
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

export const getSectionFromBusiness = (args: { sectionId: string; business: Business | null }) => {
  const { business, sectionId } = args;

  const index = business?.layouts?.posts?.sections?.findIndex?.(({ _id }) => _id === sectionId);

  if (isNumber(index) && index >= 0) {
    const section = business?.layouts?.posts?.sections?.[index];

    if (!section) return undefined;

    return {
      index,
      section,
    };
  }

  return undefined;
};

export const getLayoutsFromBusiness = (business: Business) => {
  return deepJsonCopy(business.layouts || {});
};

export const getWhatsAppPostLink = (phoneNumber: string, post: Post) => {
  const { name, routeName, _id } = post;

  const postRoute = getPostRoute({ routeName, postId: _id });

  const postUrl = `${window.location.origin}${postRoute}`;

  const search = queryToSearch({
    text: `Le escribo referente al producto *${name}* con link de referencia ${postUrl}`,
  });

  return `https://wa.me/${phoneNumber}?${search}`;
};

export const getWhatsAppSaleLink = (phoneNumber: string, sale: Sale) => {
  const { _id } = sale;

  const saleLink = '';

  const search = queryToSearch({
    text: `Le escribo referente a la orden de compra *${_id}* que posee algunos articulos de mi interes. Puede ver los detalles en el link ${saleLink}`,
  });

  return `https://wa.me/${phoneNumber}?${search}`;
};
