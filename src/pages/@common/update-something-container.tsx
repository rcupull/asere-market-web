import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface UpdateSomethingContainerProps extends StyleProps {
  children: React.ReactNode;
  position?: 'top-right';
}

export const UpdateSomethingContainer = ({ children, position }: UpdateSomethingContainerProps) => {
  const { owner } = useBusinessPageData();

  if (!owner) {
    return <></>;
  }

  return (
    <div
      className={cn({
        ['absolute top-0 right-0']: position === 'top-right',
      })}
    >
      {children}
    </div>
  );
};
