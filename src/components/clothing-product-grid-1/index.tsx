import { Formik } from 'formik';
import { PostClothing } from 'types/post';

export interface ClothingProductGrid1Props {
  value?: PostClothing;
  render: {
    images?: (value: PostClothing) => React.ReactNode;
    price?: (value: PostClothing) => React.ReactNode;
    review?: (value: PostClothing) => React.ReactNode;
    colors?: (value: PostClothing) => React.ReactNode;
    clothingSize?: (value: PostClothing) => React.ReactNode;
    description?: (value: PostClothing) => React.ReactNode;
    highLights?: (value: PostClothing) => React.ReactNode;
    details?: (value: PostClothing) => React.ReactNode;
  };
}

export const ClothingProductGrid1 = ({ value, render }: ClothingProductGrid1Props) => {
  if (!value) return <></>;

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        {render.images?.(value)}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {value.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>

            {/* Price */}
            {render.price?.(value)}

            {/* Reviews */}
            <div className="mt-10">{render.review?.(value)}</div>

            <Formik initialValues={{}} onSubmit={() => {}}>
              {() => {
                return (
                  <form className="mt-10">
                    {/* Colors */}
                    <div className="mt-10">{render.colors?.(value)}</div>

                    {/* Sizes */}
                    <div className="mt-10">{render.clothingSize?.(value)}</div>

                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to bag
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}

            {render.description?.(value)}

            <div className="mt-10">{render.highLights?.(value)}</div>

            <div className="mt-10">{render.details?.(value)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
