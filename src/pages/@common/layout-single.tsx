import { ChildrenProp } from 'types/general';

export interface LayoutSingleProps extends ChildrenProp {
  title?: string;
}

export const LayoutSingle = ({ children, title }: LayoutSingleProps) => {
  return (
    <main className="flex flex-col items-center px-32">
      {title && <h1 className="mr-auto text-3xl my-6 font-semibold">{title}</h1>}
      {children}
    </main>
  );
};
