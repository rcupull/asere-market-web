import cn from "classnames";
export interface Props {
  className?: string;
  children: React.ReactNode;
  title: string;
}

export const ProductsGroup = ({ className, children, title }: Props) => {
  return (
    <div
      data-id="ProductsGroup"
      className={cn(
        "mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8",
        className,
      )}
    >
      <h2 className="not-sr-only">{title}</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {children}
      </div>
    </div>
  );
};
