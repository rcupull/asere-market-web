import { Skeleton } from '../../@common/skeleton';
import { SwiperSliceSelect } from './SwiperSliceSelect';
import { SwiperLayout } from './swipper-layout';
import { LayoutSelectProps } from './types';
import { getChangedLayout } from './utils';

import { SearchLayoutType } from 'types/business';

const contentMap: Array<{
  label: string;
  type: SearchLayoutType;
}> = [
  {
    label: 'Sin barra de búsqueda',
    type: 'none',
  },
  {
    label: 'Izquierda',
    type: 'left',
  },
  {
    label: 'Centrada',
    type: 'center',
  },
  {
    label: 'Derecha',
    type: 'right',
  },
  {
    label: 'Categorías(botones, no excluyentes)',
    type: 'postCategories',
  },
  {
    label: 'Categorías(botones, no excluyentes, deslizables)',
    type: 'postCategoriesScrollable',
  },
  {
    label: 'Categorías(botones, excluyentes)',
    type: 'postCategoriesExcluded',
  },
  {
    label: 'Categorías(botones, excluyentes, deslizables)',
    type: 'postCategoriesExcludedScrollable',
  },
];

export interface LayoutSearchProps extends LayoutSelectProps {}

export const LayoutSearch = ({ onChange, value, ...omittedProps }: LayoutSearchProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ type }) => type === value?.search?.type)}
      items={contentMap.map(({ label, type }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.search?.type === type}
              onSelect={() => onChange?.(getChangedLayout(value, { search: { type } }))}
            >
              <Skeleton active="search" layouts={getChangedLayout(value, { search: { type } })} />
            </SwiperSliceSelect>
          ),
        };
      })}
      {...omittedProps}
    />
  );
};
