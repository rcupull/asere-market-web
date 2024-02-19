import { Skeleton, SkeletonProps } from '.';

export default {
  component: Skeleton,
};

const commonProps: SkeletonProps = {
  banner: 'static',
  posts: 'grid',
  footer: 'simple',
  search: 'wide'
};

export const Default = () => (
    <Skeleton {...commonProps} />
);

///

export const BannerStatic = () => (
    <Skeleton {...commonProps} banner="static" active="banner" />
);

export const BannerSlider = () => (
  <Skeleton {...commonProps} banner="slider" active="banner" />
);

export const SearchWide = () => (
  <Skeleton {...commonProps} search="wide" active="search" />
);

export const SearchWithButtons = () => (
<Skeleton {...commonProps} search="withButtons" active="search" />
);

///

export const PostsGrid = () => (
  <Skeleton {...commonProps} posts="grid" active="posts" />
);

export const PostsSimple = () => (
  <Skeleton {...commonProps} posts="simple" active="posts" />
);

export const PostsAlternateSumary = () => (
  <Skeleton {...commonProps} posts="alternateSummary" active="posts" />
);

///