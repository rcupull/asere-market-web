import { Swiper } from 'components/swiper';

import { Skeleton } from '../../@common/skeleton';
import { SwiperSliceSelect } from './SwiperSliceSelect';
import { LayoutSelectProps } from './types';
import { getChangedLayout } from './utils';

export interface LayoutSearchProps extends LayoutSelectProps {}

export const LayoutSearch = ({ onChange, value, ...omittedProps }: LayoutSearchProps) => {
  return (
    <Swiper
      items={[
        {
          content: (
            <SwiperSliceSelect
              label="Sin barra de búsqueda"
              selected={value?.search?.type === 'none'}
              onSelect={() => onChange?.(getChangedLayout(value, { search: { type: 'none' } }))}
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, { search: { type: 'none' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Izquierda"
              selected={value?.search?.type === 'left'}
              onSelect={() => onChange?.(getChangedLayout(value, { search: { type: 'left' } }))}
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, { search: { type: 'left' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Centrada"
              selected={value?.search?.type === 'center'}
              onSelect={() => onChange?.(getChangedLayout(value, { search: { type: 'center' } }))}
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, { search: { type: 'center' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Derecha"
              selected={value?.search?.type === 'right'}
              onSelect={() => onChange?.(getChangedLayout(value, { search: { type: 'right' } }))}
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, { search: { type: 'right' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Categorías(botones, no excluyentes)"
              selected={value?.search?.type === 'postCategories'}
              onSelect={() =>
                onChange?.(getChangedLayout(value, { search: { type: 'postCategories' } }))
              }
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, { search: { type: 'postCategories' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Categorías(botones, no excluyentes, deslizables)"
              selected={value?.search?.type === 'postCategoriesScrollable'}
              onSelect={() =>
                onChange?.(
                  getChangedLayout(value, { search: { type: 'postCategoriesScrollable' } }),
                )
              }
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, { search: { type: 'postCategoriesScrollable' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Categorías(botones, excluyentes)"
              selected={value?.search?.type === 'postCategoriesExcluded'}
              onSelect={() =>
                onChange?.(getChangedLayout(value, { search: { type: 'postCategoriesExcluded' } }))
              }
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, { search: { type: 'postCategoriesExcluded' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Categorías(botones, excluyentes, deslizables)"
              selected={value?.search?.type === 'postCategoriesExcludedScrollable'}
              onSelect={() =>
                onChange?.(
                  getChangedLayout(value, { search: { type: 'postCategoriesExcludedScrollable' } }),
                )
              }
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, {
                  search: { type: 'postCategoriesExcludedScrollable' },
                })}
              />
            </SwiperSliceSelect>
          ),
        },
      ]}
      {...omittedProps}
    />
  );
};
