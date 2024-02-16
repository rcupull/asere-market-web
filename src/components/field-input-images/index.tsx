import { PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { forwardRef, useEffect, useMemo, useState } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { ProLink } from 'components/pro-link';

import { useFormikField } from 'hooks/useFormikField';

import { Image } from 'types/general';
import { cn, getFlattenArray, isNumber } from 'utils/general';

export interface FieldInputImagesProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    FormFieldWrapperProps {
  multi?: boolean;
  getImageSrc?: (src: string) => string;
  max?: number;
}

type State = Array<Image | File | undefined | null>;

export const FieldInputImages = forwardRef<HTMLInputElement, FieldInputImagesProps>(
  (props, ref) => {
    const { className, label, multi, max, getImageSrc: getImageSrcProp, ...omittedProps } = props;

    const { field, error } = useFormikField(props);

    const { value } = field;

    const [state, setState] = useState<State>([]);

    const [stateToPreview, setStateToPreview] = useState<State>([undefined]);
    const [previewIndex, setPreviewIndex] = useState<number>(0);

    const isDisabledByPremium = (s: State) => {
      return isNumber(max) && max <= getFlattenArray(s).length;
    };

    const addOneEmptyPreview = (s: State): State => {
      return isDisabledByPremium(s) ? s : [...s, undefined];
    };

    const getImageSrc = (image: Image | File) => {
      if (image instanceof File) {
        return URL.createObjectURL(image);
      }

      return getImageSrcProp?.(image.src) || '';
    };

    const previewImage = useMemo(() => {
      const currentImage = stateToPreview[previewIndex];

      if (!currentImage) {
        return undefined;
      }

      return getImageSrc(currentImage);
    }, [previewIndex, stateToPreview]);

    useEffect(() => {
      if (value !== state || isNumber(max)) {
        const newState = (value || []) as unknown as State;
        setState(newState);
        const newPreviewState = addOneEmptyPreview(newState);
        setStateToPreview(newPreviewState);
        setPreviewIndex(0);
      }
    }, [value, max]);

    const handleChange = (file: File | null | undefined, action: 'add' | 'remove' | 'change') => {
      let newStateToPreview = [...stateToPreview];
      newStateToPreview[previewIndex] = file;

      switch (action) {
        case 'add': {
          newStateToPreview = addOneEmptyPreview(newStateToPreview);
          break;
        }
        case 'remove': {
          setPreviewIndex(0);
          newStateToPreview = getFlattenArray(newStateToPreview);
          newStateToPreview = addOneEmptyPreview(newStateToPreview);
          break;
        }
        case 'change': {
          newStateToPreview = addOneEmptyPreview(newStateToPreview);
          break;
        }

        default:
          break;
      }

      setStateToPreview(newStateToPreview);

      const newState = getFlattenArray(newStateToPreview);
      setState(newState);

      field.onChange({
        target: {
          name: field.name,
          value: newState,
        },
      });
    };

    return (
      <FormFieldWrapper label={label} error={error} className={className}>
        {multi && (
          <div className="flex items-center justify-start gap-2 mb-1">
            {stateToPreview?.map((image, index) => {
              const selected = index === previewIndex;

              return (
                <div
                  key={index}
                  className={cn('h-8 w-10 cursor-pointer', {
                    'border-gray-700 border-2 rounded-sm': selected,
                  })}
                  onClick={() => {
                    setPreviewIndex(index);
                  }}
                >
                  {image ? (
                    <img src={getImageSrc(image)} className="h-full w-full" />
                  ) : (
                    <div className="relative h-full w-full text-gray-500">
                      <PhotoIcon
                        key={index}
                        className="h-full w-full text-gray-300"
                        aria-hidden="true"
                      />
                      <PlusIcon className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 font-bold" />
                    </div>
                  )}
                </div>
              );
            })}

            {isDisabledByPremium(state) && (
              <div className="border-2 border-gray-300 rounded-md h-8 w-10 flex items-center justify-center">
                <ProLink />
              </div>
            )}
          </div>
        )}
        <div
          className={cn('relative h-48', {
            'ring-1 rounded-md ring-red-500 focus:ring-red-500': !!error,
          })}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={(event) => {
            event.preventDefault();

            if (isDisabledByPremium(state)) return;

            handleChange(
              event.dataTransfer.files?.[0],
              previewIndex === stateToPreview.length - 1 ? 'add' : 'change',
            );
          }}
        >
          {previewImage ? (
            <>
              <img src={previewImage} className="h-full w-full" />
              <div
                className="!absolute top-1 right-1 flex items-center justify-center cursor-pointer bg-gray-200 p-2 hover:bg-gray-300 rounded-md text-red-600"
                onClick={() => {
                  handleChange(null, 'remove');
                }}
              >
                <TrashIcon className="h-6 w-6" />
              </div>
            </>
          ) : (
            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor={field.name}
                    className={cn(
                      'relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500',
                      {
                        '!cursor-not-allowed': isDisabledByPremium(state),
                      },
                    )}
                  >
                    <span>Suba una imagen</span>
                    <input
                      ref={ref}
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      disabled={isDisabledByPremium(state)}
                      {...omittedProps}
                      {...field}
                      value=""
                      onChange={(event) => {
                        handleChange(
                          event.target.files?.[0],
                          previewIndex === stateToPreview.length - 1 ? 'add' : 'change',
                        );
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
