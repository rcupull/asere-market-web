import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Shopping } from 'types/shopping';

export interface RowActionsProps {
  rowData: Shopping;
  routeName: string;
}
export const RowActions = ({ rowData, routeName }: RowActionsProps) => {
  return <RowActionsContainer>some actions</RowActionsContainer>;
};
