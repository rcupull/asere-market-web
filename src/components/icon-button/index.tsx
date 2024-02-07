import { Button, ButtonProps } from 'components/button';

import { cn } from 'utils/general';

export interface IconButtonProps extends ButtonProps {}

export const IconButton = ({ className, ...omittedProps }: IconButtonProps) => (
  <Button {...omittedProps} className={cn('rounded-3xl px-1.5 py-1.5', className)} />
);
