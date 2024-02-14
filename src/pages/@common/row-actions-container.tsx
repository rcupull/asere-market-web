import { ChildrenProp } from 'types/general';

export interface RowActionsContainerProps extends ChildrenProp {}

export const RowActionsContainer = ({ children }: RowActionsContainerProps) => {
  return <div className="flex items-center w-fit">{children}</div>;
};
