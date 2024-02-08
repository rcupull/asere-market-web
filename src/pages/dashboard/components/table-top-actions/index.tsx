import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface TableTopActionsProps extends ChildrenProp, StyleProps {}

export const TableTopActions = ({ children, className }: TableTopActionsProps) => {
  return <div className={cn("border-solid border-2 border-gray-200 flex w-full p-1 rounded-lg", className)}>{children}</div>;
};
