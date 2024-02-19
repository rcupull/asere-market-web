import { Skeleton, SkeletonProps } from '.';

export default {
  component: Skeleton,
};

const commonProps: SkeletonProps = {
  banner: 'static',
  posts: 'grid',
  footer: 'basic',
  search: 'wide',
};

export const Default = () => <Skeleton {...commonProps} />;

///

export const BannerStatic = () => <Skeleton {...commonProps} banner="static" active="banner" />;

export const BannerSwipableClassic = () => (
  <Skeleton {...commonProps} banner="swipableClassic" active="banner" />
);

export const SearchWide = () => <Skeleton {...commonProps} search="wide" active="search" />;

export const SearchWithButtons = () => (
  <Skeleton {...commonProps} search="withButtons" active="search" />
);

///

export const PostsGrid = () => <Skeleton {...commonProps} posts="grid" active="posts" />;

export const PostsSliceHorizontal = () => (
  <Skeleton {...commonProps} posts="slicesHorizontal" active="posts" />
);

export const PostsAlternateSumary = () => (
  <Skeleton {...commonProps} posts="alternateSummary" active="posts" />
);

///
