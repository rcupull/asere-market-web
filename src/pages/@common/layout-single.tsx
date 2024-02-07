import { ChildrenProp } from 'types/general';

export interface LayoutSingleProps extends ChildrenProp {}

export const LayoutSingle = ({ children }: LayoutSingleProps) => {
  return <main className="flex flex-col items-center px-32">{children}</main>;
};
