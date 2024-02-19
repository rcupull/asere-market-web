import { StyleProps } from 'types/general';
import { cn, range } from 'utils/general';

interface PieceProps extends StyleProps {
  active?: boolean;
}
const Piece = ({ className, active }: PieceProps) => {
  return (
    <div
      className={cn(
        'w-full h-2 bg-gray-200 rounded-md',
        {
          'bg-indigo-800': active,
        },
        className,
      )}
    />
  );
};

////////////////////////////////////////////////////////////////////////////////////

export interface SkeletonProps {
  type?: 'banner' | 'footer' | 'posts' | 'search';
}

export const SkeletonMini = ({ type }: SkeletonProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-20 ring-1 ring-gray-300 p-2 flex flex-col items-center gap-2">
        <Piece active={type === 'banner'} className="!h-2.5" />

        <div className="w-10/12">
          <Piece active={type === 'search'} className="!h-1" />

          <div className="flex flex-wrap gap-1 justify-between mt-2">
            {range(12).map((index) => (
              <Piece key={index} active={type === 'posts'} className="!w-2" />
            ))}
          </div>
        </div>

        <Piece active={type === 'footer'} />
      </div>
    </div>
  );
};
