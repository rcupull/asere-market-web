import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface TableTopActionsProps extends ChildrenProp, StyleProps {}

export const TableTopActions = ({ children, className }: TableTopActionsProps) => {
  return (
    <div
      className={cn('flex w-full px-1 py-3 gap-3', className)}
    >
      {children}
    </div>
  );
};
