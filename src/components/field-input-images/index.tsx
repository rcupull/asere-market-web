import { PhotoIcon } from '@heroicons/react/24/outline';
import { forwardRef, useState } from 'react';

import { Button } from 'components/button';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { useFormikField } from 'hooks/useFormikField';

import { cn } from 'utils/general';

export interface FieldInputImagesProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    FormFieldWrapperProps {}

export const FieldInputImages = forwardRef<HTMLInputElement, FieldInputImagesProps>(
  (props, ref) => {
    const { className, label, ...omittedProps } = props;

    const { field, error } = useFormikField(props);
    const [previewImage, setPreviewImage] = useState<string>();

    const handleChange = (files?: FileList | null) => {
      const file = files?.[0];

      setPreviewImage(file && URL.createObjectURL(file));
      field.onChange({
        target: {
          name: field.name,
          value: [file], //TODO
        },
      });
    };

    return (
      <FormFieldWrapper label={label} error={error} className={className}>
        <div
          className={cn('relative h-48', {
            'ring-1 rounded-md ring-red-500 focus:ring-red-500': !!error,
          })}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={(event) => {
            event.preventDefault();
            handleChange(event.dataTransfer.files);
          }}
        >
          {previewImage ? (
            <>
              <img src={previewImage} className="h-full w-full" />
              <Button
                variant="outlined"
                label="Eliminar"
                className="!absolute top-0 right-0"
                onClick={() => handleChange(null)}
              />
            </>
          ) : (
            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor={field.name}
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Suba una imagen</span>
                    <input
                      ref={ref}
                      type="file"
                      className="sr-only"
                      {...omittedProps}
                      {...field}
                      value=""
                      onChange={(event) => {
                        handleChange(event.target.files);
                      }}
                    />
                  </label>
                  <p className="pl-1">o arrastre y suelte</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          )}
        </div>
      </FormFieldWrapper>
    );
  },
);
