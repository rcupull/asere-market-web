import { Skeleton } from '../../@common/skeleton';
import { SwiperSliceSelect } from './SwiperSliceSelect';
import { SwiperLayout } from './swipper-layout';
import { LayoutSelectProps } from './types';
import { getChangedLayout } from './utils';

import { SearchLayoutType } from 'types/business';

const renderCategoryLabel = (detail: string) => {
  return (
    <span>
      Categorías<span className="text-gray-500">({detail})</span>
    </span>
  );
};

const contentMap: Array<{
  label: React.ReactNode;
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
    label: renderCategoryLabel('selección múltiple'),
    type: 'postCategories',
  },
  {
    label: renderCategoryLabel('selección múltiple, deslizable'),
    type: 'postCategoriesScrollable',
  },
  {
    label: renderCategoryLabel('selección simple'),
    type: 'postCategoriesExcluded',
  },
  {
    label: renderCategoryLabel('selección simple, deslizable'),
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
