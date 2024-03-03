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
      type: 'right',
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

export const SearchLeft = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { search: { type: 'left' } } })}
    active="search"
  />
);

export const SearchCenter = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { search: { type: 'center' } } })}
    active="search"
  />
);

export const SearchRight = () => (
  <Skeleton
    {...mergeDeep<SkeletonProps>(commonProps, { layouts: { search: { type: 'right' } } })}
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
