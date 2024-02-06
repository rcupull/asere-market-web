import { BackButton } from 'components/back-button';

import { ChildrenProp } from 'types/general';

export interface TableTopActionsProps extends ChildrenProp {
  backButton?: boolean;
}

export const TableTopActions = ({ children, backButton }: TableTopActionsProps) => {
  return (
    <div className="flex w-full py-3">
      {backButton && <BackButton />}
      {children}
    </div>
  );
};
