import { MutedBox } from 'components/muted-box';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { cn, range } from 'utils/general';

export interface SkeletonProps extends StyleProps {
  layouts?: Business['layouts'];
  active?: 'banner' | 'footer' | 'posts' | 'search';
}

export const Skeleton = ({ active, className, layouts }: SkeletonProps) => {
  const { banner, footer, posts, search } = layouts || {};

  const renderBanner = () => {
    if (banner?.type === 'static') {
      return <MutedBox className="!h-30" active={active === 'banner'} />;
    }

    if (banner?.type === 'swipableClassic') {
      return (
        <div className="flex flex-col items-center w-full">
          <MutedBox className="!h-30" active={active === 'banner'} />

          <div className="flex gap-1 mt-2">
            {range(5).map((index) => (
              <MutedBox
                key={index}
                className="!w-3 !h-3 !rounded-full"
                active={active === 'banner'}
              />
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderPosts = () => {
    if (posts?.type === 'grid') {
      return (
        <div className="flex flex-wrap gap-2 justify-between mt-5">
          {range(9).map((index) => (
            <MutedBox key={index} className="!w-full sm:!w-16 !h-16" active={active === 'posts'} />
          ))}
        </div>
      );
    }

    if (posts?.type === 'slicesHorizontal') {
      return (
        <div className="flex flex-col gap-2 justify-between mt-5">
          {range(3).map((index) => (
            <MutedBox key={index} className="!sm:w-24 !h-16" active={active === 'posts'} />
          ))}
        </div>
      );
    }

    if (posts?.type === 'alternateSummary') {
      return (
        <div className="flex flex-col gap-2 justify-between mt-5">
          {range(3).map((index) => (
            <div
              key={index}
              className={cn('flex w-full gap-2', {
                'flex-row-reverse': index % 2 === 0,
              })}
            >
              <MutedBox className="!h-16 !w-16" active={active === 'posts'} />
              <MutedBox className="!h-16" active={active === 'posts'} />
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderSearch = () => {
    const searchAndButtons = (
      <div className="w-40 flex gap-2">
        <MutedBox className="!h-6" active={active === 'search'} />
        <MutedBox className="!w-8 !h-6" active={active === 'search'} />
        <MutedBox className="!w-8 !h-6" active={active === 'search'} />
      </div>
    );

    if (search?.type === 'left') {
      return <div className="flex justify-start">{searchAndButtons}</div>;
    }

    if (search?.type === 'center') {
      return <div className="flex justify-center">{searchAndButtons}</div>;
    }

    if (search?.type === 'right') {
      return <div className="flex justify-end">{searchAndButtons}</div>;
    }

    if (search?.type === 'postCategories') {
      return (
        <div className="flex gap-2 flex-wrap">
          {range(8).map((index)=> <MutedBox key={index} className="!w-10 !h-6" active={active === 'search'} />)}
        </div>
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (footer?.type === 'basic') {
      return <MutedBox className="h-10" active={active === 'footer'} />;
    }

    return null;
  };

  return (
    <div className={cn('flex justify-center', className)}>
      <div className="w-11/12 lg:w-8/12 xl:w-4/12 p-4 flex flex-col items-center gap-4">
        {renderBanner()}

        <div className="w-full sm:w-10/12">
          {renderSearch()}

          {renderPosts()}
        </div>

        {renderFooter()}
      </div>
    </div>
  );
};
