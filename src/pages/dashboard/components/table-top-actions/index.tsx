import { ChildrenProp } from 'types/general';

export interface TableTopActionsProps extends ChildrenProp {}

export const TableTopActions = ({ children }: TableTopActionsProps) => {
  return <div className="flex w-full py-3">{children}</div>;
};
