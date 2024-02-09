import { replaceAll } from './general';

import { BusinessCategory } from 'types/business';

export const getRouteName = (name: string): string => {
  let out = name.trim().toLowerCase();
  out = replaceAll(out, ' ', '-');
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
