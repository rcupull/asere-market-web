import { useState } from 'react';

import { IconButtonUpdate } from 'components/icon-button-update';

import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface UpdateSomethingContainerProps extends StyleProps {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export const UpdateSomethingContainer = ({
  children,
  onClick,
  title,
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
        'relative border-2 border-dashed border-transparent rounded-md',
        {
          '!border-gray-400': over,
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
        <IconButtonUpdate
          title={title}
          onClick={(e) => {
            e.preventDefault();
            onClick?.();
          }}
        />
      </div>
    </div>
  );
};
