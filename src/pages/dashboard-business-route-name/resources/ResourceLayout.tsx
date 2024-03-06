import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface ResourceLayoutProps extends StyleProps {
  title: React.ReactNode;
  description: React.ReactNode;
  action: React.ReactNode;
}

export const ResourceLayout = ({
  title,
  action,
  className,
  description,
}: ResourceLayoutProps): JSX.Element => {
  return (
    <div className={cn('mt-4 w-full', className)}>
      <h2 className="text-xl bg-gray-200 mt-3 mb-2 p-2 rounded-sm">{title}</h2>
      <div className="flex items-center justify-between">
        <div className='text-justify px-6'>{description}</div>
        {action}
      </div>
    </div>
  );
};
