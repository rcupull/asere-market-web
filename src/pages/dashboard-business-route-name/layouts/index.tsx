import { Tabs } from 'components/tabs';

import { LayoutBanner } from './layout-banner';
import { LayoutPosts } from './layout-posts';
import { LayoutSearch } from './layout-search';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SkeletonMini } from 'pages/@common/skeleton-mini';
import { Business } from 'types/business';
import { cn } from 'utils/general';

export interface LayoutsProps {
  business: Business;
}

type LayoutType = 'banner' | 'search' | 'posts';

export const Layouts = ({ business }: LayoutsProps) => {
  return (
    <LayoutPageSection>
      <Tabs<LayoutType>
        className="mt-4 gap-4"
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
                  'border-indigo-600': selected,
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
            content: <LayoutBanner business={business} />,
          },
          {
            label: 'search',
            content: <LayoutSearch business={business} />,
          },
          {
            label: 'posts',
            content: <LayoutPosts business={business} />,
          },
        ]}
      />
    </LayoutPageSection>
  );
};
