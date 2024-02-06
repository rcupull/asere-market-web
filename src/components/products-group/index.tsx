import cn from 'classnames';
export interface Props {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

export const ProductsGroup = ({ className, children, title }: Props) => {
  return (
    <div
      data-id="ProductsGroup"
      className={cn(
        className,
      )}
    >
      {title && <h2 className="not-sr-only">{title}</h2>}

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {children}
      </div>
    </div>
  );
};
