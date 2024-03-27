import { useEffect, useState } from 'react';

import { Button } from 'components/button';
import { Tabs } from 'components/tabs';

import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';

import { useRouter } from 'hooks/useRouter';

import { LayoutBanner } from './layout-banner';
import { LayoutPostCard } from './layout-post-card';
import { LayoutPosts } from './layout-posts';
import { LayoutSearch } from './layout-search';
import { LayoutSelectProps } from './types';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SkeletonMini } from 'pages/@common/skeleton-mini';
import { Business, BusinessLayouts } from 'types/business';
import { cn, isEqualObj } from 'utils/general';

export interface LayoutsProps {
  business: Business;
  onRefresh: () => void;
}

type LayoutType = 'banner' | 'search' | 'posts' | 'postCard';

export const Layouts = ({ business, onRefresh }: LayoutsProps) => {
  const { query, onChangeQuery } = useRouter();

  const { layouts, routeName } = business;

  const [value, setValue] = useState<BusinessLayouts>();

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

  const withSaveButton = (content: React.ReactNode) => (
    <>
      <div className="flex justify-center">
        <Button
          className="w-full mb-4"
          label="Guardar"
          disabled={!hasChanges}
          onClick={handleSubmit}
        />
      </div>
      {content}
    </>
  );
  return (
    <LayoutPageSection className='-mt-4'>
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
                {label === 'postCard' && 'Publicación'}
              </span>
              <div
                className={cn('hover:bg-gray-50 border-2 border-transparent rounded-sm', {
                  '!border-indigo-600': selected,
                })}
              >
                {label === 'banner' && <SkeletonMini type="banner" />}
                {label === 'search' && <SkeletonMini type="search" />}
                {label === 'posts' && <SkeletonMini type="posts" />}
                {label === 'postCard' && <SkeletonMini type="postCard" />}
              </div>
            </div>
          );
        }}
        items={[
          {
            label: 'banner',
            content: withSaveButton(<LayoutBanner {...commonProps} />),
          },
          {
            label: 'search',
            content: withSaveButton(<LayoutSearch {...commonProps} />),
          },
          {
            label: 'posts',
            content: withSaveButton(<LayoutPosts {...commonProps} />),
          },
          {
            label: 'postCard',
            content: withSaveButton(<LayoutPostCard {...commonProps} />),
          },
        ]}
      />
    </LayoutPageSection>
  );
};
