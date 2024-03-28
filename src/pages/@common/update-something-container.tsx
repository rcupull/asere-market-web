import { useState } from 'react';

import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface UpdateSomethingContainerProps extends StyleProps {
  children: React.ReactNode;
  button: React.ReactNode;
}

export const UpdateSomethingContainer = ({
  children,
  button,
  className,
}: UpdateSomethingContainerProps) => {
  const { owner } = useBusinessPageData();
  const [over, setOver] = useState(false);

  if (!owner) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        'relative border border-dashed border-transparent rounded-md',
        {
          '!border-gray-400 bg-gray-100': over,
        },
        className,
      )}
    >
      {children}
      <div
        onMouseLeave={() => setOver(false)}
        onMouseEnter={() => setOver(true)}
        className={cn('absolute top-0 right-0')}
      >
        {button}
      </div>
    </div>
  );
};
