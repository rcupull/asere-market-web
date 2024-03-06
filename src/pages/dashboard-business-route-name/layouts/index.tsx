import { useEffect, useState } from 'react';

import { Button } from 'components/button';
import { Tabs } from 'components/tabs';

import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';

import { useRouter } from 'hooks/useRouter';

import { LayoutBanner } from './layouts-banner';
import { LayoutPosts } from './layouts-posts';
import { LayoutSearch } from './layouts-search';
import { LayoutSelectProps } from './types';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SkeletonMini } from 'pages/@common/skeleton-mini';
import { Business, BusinessLayout } from 'types/business';
import { cn, isEqualObj } from 'utils/general';

export interface LayoutsProps {
  business: Business;
  onRefresh: () => void;
}

type LayoutType = 'banner' | 'search' | 'posts';

export const Layouts = ({ business, onRefresh }: LayoutsProps) => {
  const { query, onChangeQuery } = useRouter();

  const { layouts, routeName } = business;

  const [value, setValue] = useState<BusinessLayout>();

  const { updateOneUserBusiness } = useUpdateOneUserBusiness();

  useEffect(() => {
    setValue(layouts);
  }, [JSON.stringify(layouts)]);

  const hasChanges = !isEqualObj(value, layouts);

  const handleSubmit = () => {
    if (!hasChanges) return;
    updateOneUserBusiness.fetch(
      {
        routeName,
        update: {
          layouts: value,
        },
      },
      {
        onAfterSuccess: onRefresh,
      },
    );
  };

  const commonProps: LayoutSelectProps = {
    value,
    onChange: setValue,
  };

  return (
    <LayoutPageSection>
      <Button label="Guardar" disabled={!hasChanges} onClick={handleSubmit} />
      <Tabs<LayoutType>
        className="mt-4 gap-4"
        selected={query.layoutTab as number | undefined}
        onSelect={(layoutTab) => onChangeQuery({ layoutTab })}
        itemRender={({ selected, label }) => {
          return (
            <div className="flex flex-col items-center">
              <span
                className={cn({
                  'text-indigo-800 font-bold': selected,
                })}
              >
                {label === 'banner' && 'Banner'}
                {label === 'search' && 'Búsqueda'}
                {label === 'posts' && 'Publicaciones'}
              </span>
              <div
                className={cn('hover:bg-gray-50 border-2 border-transparent rounded-sm', {
                  '!border-indigo-600': selected,
                })}
              >
                {label === 'banner' && <SkeletonMini type="banner" />}
                {label === 'search' && <SkeletonMini type="search" />}
                {label === 'posts' && <SkeletonMini type="posts" />}
              </div>
            </div>
          );
        }}
        items={[
          {
            label: 'banner',
            content: <LayoutBanner {...commonProps} />,
          },
          {
            label: 'search',
            content: <LayoutSearch {...commonProps} />,
          },
          {
            label: 'posts',
            content: <LayoutPosts {...commonProps} />,
          },
        ]}
      />
    </LayoutPageSection>
  );
};
