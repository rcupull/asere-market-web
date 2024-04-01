import { useEffect, useRef, useState } from 'react';

import { FieldSelect } from 'components/field-select';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { DummyPostCard } from './components/dummy-post-card';

import { Formik } from 'formik';
import {
  PostCardLayout,
  PostCardLayoutDiscount,
  PostCardLayoutImages,
  PostCardLayoutName,
  PostCardLayoutPrice,
  PostCardSize,
} from 'types/business';
import { AnyRecord } from 'types/general';
import { cn } from 'utils/general';

export interface FieldPostCardLayoutProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {}

export const FieldPostCardLayout = ({ className, label, ...props }: FieldPostCardLayoutProps) => {
  const { field, error } = useFormikField(props);

  const { value, onChange, name, onBlur } = field;

  const [state, setState] = useState<PostCardLayout>({});
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setState(value);
  }, [value]);

  const handleChange = (newState: PostCardLayout) => {
    setState(newState);
    onBlur({ target: { name } });

    onChange({
      target: {
        name,
        value: newState,
      },
    });
  };

  const refValues = useRef<PostCardLayout>({});

  return (
    <FormFieldWrapper
      label={
        <div className="flex flex-wrap gap-1">
          <span>{label}</span>
          <div
            className="text-indigo-500 cursor-pointer"
            onClick={() => setShowPreview(!showPreview)}
          >{`${showPreview ? '(Ocultar vista previa)' : '(Mostrar vista previa)'}`}</div>
        </div>
      }
      error={error}
      className={cn(className)}
    >
      <div className="flex flex-col lg:flex-row gap-2 items-center lg:items-start">
        <div className="w-full px-6">
          <Formik<PostCardLayout>
            initialValues={{
              images: 'static',
              size: 'medium',
              discount: 'none',
              name: 'basic',
              price: 'smallerCurrency',
              ...(value || {}),
            }}
            enableReinitialize
            onSubmit={() => {}}
          >
            {({ values }) => {
              if (refValues.current !== values) {
                refValues.current = values;
                handleChange(values);
              }

              return (
                <form className="flex flex-col justify-around h-full gap-2">
                  <FieldSelect<{ value: PostCardLayoutImages }>
                    label="Imágenes"
                    name="images"
                    renderOption={({ value }) => value}
                    renderValue={({ value }) => value}
                    optionToValue={({ value }) => value}
                    items={[
                      {
                        value: 'static',
                      },
                      {
                        value: 'hoverZoom',
                      },
                      {
                        value: 'slider',
                      },
                      {
                        value: 'switch',
                      },
                    ]}
                    className="w-full"
                  />

                  <FieldSelect<{ value: PostCardSize }>
                    label="Tamaño"
                    name="size"
                    renderOption={({ value }) => value}
                    renderValue={({ value }) => value}
                    optionToValue={({ value }) => value}
                    items={[
                      {
                        value: 'small',
                      },
                      {
                        value: 'medium',
                      },
                      {
                        value: 'long',
                      },
                    ]}
                    className="w-full"
                  />

                  <FieldSelect<{ value: PostCardLayoutName }>
                    label="Nombre"
                    name="name"
                    renderOption={({ value }) => value}
                    renderValue={({ value }) => value}
                    optionToValue={({ value }) => value}
                    items={[
                      {
                        value: 'none',
                      },
                      {
                        value: 'basic',
                      },
                    ]}
                    className="w-full"
                  />
                  <FieldSelect<{ value: PostCardLayoutPrice }>
                    label="Precio"
                    name="price"
                    renderOption={({ value }) => value}
                    renderValue={({ value }) => value}
                    optionToValue={({ value }) => value}
                    items={[
                      {
                        value: 'none',
                      },
                      {
                        value: 'basic',
                      },
                      {
                        value: 'smallerCurrency',
                      },
                      {
                        value: 'usdCurrencySymbol',
                      },
                    ]}
                    className="w-full"
                  />
                  <FieldSelect<{ value: PostCardLayoutDiscount }>
                    label="Descuento"
                    name="discount"
                    renderOption={({ value }) => value}
                    renderValue={({ value }) => value}
                    optionToValue={({ value }) => value}
                    items={[
                      {
                        value: 'none',
                      },
                      {
                        value: 'savedMoney',
                      },
                      {
                        value: 'savedPercent',
                      },
                    ]}
                    className="w-full"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
        {showPreview && (
          <div className="flex justify-center items-center w-96 flex-shrink-0 h-[25rem]">
            <div className="border border-dashed border-gray-400 w-fit h-fit">
              <DummyPostCard postCardLayout={state} />
            </div>
          </div>
        )}
      </div>
    </FormFieldWrapper>
  );
};
