import { Button, ButtonProps } from 'components/button';

import { cn } from 'utils/general';

export interface IconButtonProps extends ButtonProps {}

export const IconButton = ({ className, variant, ...omittedProps }: IconButtonProps) => (
  <Button
    {...omittedProps}
    className={cn(
      '!rounded-full !p-1',
      {
        ['text-red-600 ring-red-600']: variant === 'error',
        ['text-indigo-600 ring-indigo-600']: variant === 'primary',
      },
      className,
    )}
    variant="outlined"
  />
);
