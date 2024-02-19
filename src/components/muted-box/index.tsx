import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface MutedBoxProps extends StyleProps {
  active?: boolean;
}

export const MutedBox = ({ className, active }: MutedBoxProps) => {
  return (
    <div
      className={cn(
        'w-full h-24 border-2 bg-gray-200 rounded-md',
        {
          'border-gray-500': active,
        },
        className,
      )}
    />
  );
};
