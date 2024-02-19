import { MutedBox } from 'components/muted-box';

import { cn, range } from 'utils/general';

export interface SkeletonProps {
  banner?: 'static' | 'slider';
  posts?: 'grid' | 'simple' | 'alternateSummary';
  footer?: 'simple';
  search?: 'wide' | 'withButtons';
  active?: 'banner' | 'footer' | 'posts' | 'search';
}

export const Skeleton = ({ banner, active, footer, posts, search }: SkeletonProps) => {
  const renderBanner = () => {
    if (banner === 'static') {
      return <MutedBox className="!h-36" active={active === 'banner'} />;
    }

    if (banner === 'slider') {
      return (
        <div className="flex flex-col items-center w-full">
          <MutedBox className="!h-36" active={active === 'banner'} />

          <div className="flex gap-1 mt-2">
            <MutedBox className="!w-4 !h-4 !rounded-full" active={active === 'banner'} />
            <MutedBox className="!w-4 !h-4 !rounded-full" active={active === 'banner'} />
            <MutedBox className="!w-4 !h-4 !rounded-full" active={active === 'banner'} />
            <MutedBox className="!w-4 !h-4 !rounded-full" active={active === 'banner'} />
            <MutedBox className="!w-4 !h-4 !rounded-full" active={active === 'banner'} />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderPosts = () => {
    if (posts === 'grid') {
      return (
        <div className="flex flex-wrap gap-2 justify-between mt-5">
          {range(12).map((index) => (
            <MutedBox key={index} className="!w-24 !h-20" active={active === 'posts'} />
          ))}
        </div>
      );
    }

    if (posts === 'simple') {
      return (
        <div className="flex flex-col gap-2 justify-between mt-5">
          {range(3).map((index) => (
            <MutedBox key={index} className="!h-20" active={active === 'posts'} />
          ))}
        </div>
      );
    }

    if (posts === 'alternateSummary') {
      return (
        <div className="flex flex-col gap-2 justify-between mt-5">
          {range(4).map((index) => (
            <div
              key={index}
              className={cn('flex w-full gap-2', {
                'flex-row-reverse': index % 2 === 0,
              })}
            >
              <MutedBox key={index} className="!h-32 !w-3/12" active={active === 'posts'} />
              <MutedBox key={index} className="!h-32" active={active === 'posts'} />
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderSearch = () => {
    if (search === 'wide') {
      return <MutedBox className="!h-6" active={active === 'search'} />;
    }

    if (search === 'withButtons') {
      return (
        <div className="w-full flex gap-2">
          <MutedBox className="!h-6" active={active === 'search'} />
          <MutedBox className="!w-8 !h-6" active={active === 'search'} />
          <MutedBox className="!w-8 !h-6" active={active === 'search'} />
        </div>
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (footer === 'simple') {
      return <MutedBox className="h-10" active={active === 'footer'} />;
    }

    return null;
  };

  return (
    <div className="flex justify-center">
      <div className="w-8/12 ring-1 ring-gray-300 p-4 flex flex-col items-center gap-4">
        {renderBanner()}

        <div className="w-8/12">
          {renderSearch()}

          {renderPosts()}
        </div>

        {renderFooter()}
      </div>
    </div>
  );
};
