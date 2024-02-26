import { Skeleton, SkeletonProps } from '.';

import { mergeDeep } from 'utils/general';

export default {
  component: Skeleton,
};

const commonProps: SkeletonProps = {
  layouts: {
    banner: {
      type: 'static',
    },
    footer: {
      type: 'basic',
    },
    posts: {
      type: 'grid',
    },
    search: {
      type: 'wide',
    },
  },
};

export const Default = () => <Skeleton {...commonProps} />;

///

export const BannerStatic = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { banner: { type: 'static' } } })}
    active="banner"
  />
);

export const BannerSwipableClassic = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { banner: { type: 'swipableClassic' } } })}
    active="banner"
  />
);

export const SearchWide = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { search: { type: 'wide' } } })}
    active="search"
  />
);

export const SearchWithButtons = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { search: { type: 'withButtons' } } })}
    active="search"
  />
);

///

export const PostsGrid = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { posts: { type: 'grid' } } })}
    active="posts"
  />
);

export const PostsSliceHorizontal = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { posts: { type: 'slicesHorizontal' } } })}
    active="posts"
  />
);

export const PostsAlternateSumary = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { posts: { type: 'alternateSummary' } } })}
    active="posts"
  />
);

///
