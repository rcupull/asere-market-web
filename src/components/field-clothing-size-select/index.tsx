import { RadioGroup } from '@headlessui/react';
import { useEffect, useState } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { allClotingSize } from 'constants/posts';
import { PostClothingSize } from 'types/post';
import { addRow, cn, isNumber, removeRow } from 'utils/general';

type Value = PostClothingSize | Array<PostClothingSize>;

export interface FieldClothingSizeSelectProps<V extends Value = Value>
  extends FormFieldWrapperProps,
    FormikFieldProps<V> {
  items?: Array<PostClothingSize>;
  multi?: boolean;
}

export const FieldClothingSizeSelect = <V extends Value = Value>(
  props: FieldClothingSizeSelectProps<V>,
) => {
  const [state, setState] = useState<V>();

  const { label, className, items, multi } = props;
  const { field, error } = useFormikField<V>(props);
  const { value } = field;

  useEffect(() => {
    setState(value);
  }, [value]);

  const handleClick = (size: PostClothingSize) => {
    if (multi) {
      let newState = (state ? state : []) as Array<PostClothingSize>;

      const index = newState.findIndex((c) => c.name === size.name);

      if (isNumber(index) && index >= 0) {
        //remove color
        newState = removeRow(newState, index);
      } else {
        //add color
        newState = addRow(newState, size);
      }

      setState(newState as V);
      field.onChange({
        target: {
          name: field.name,
          value: newState,
        },
      });
    } else {
      setState(size as V);
      field.onChange({
        target: {
          name: field.name,
          value: size,
        },
      });
    }
  };

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <RadioGroup
        className="mt-4"
        onBlur={(e) => {
          //@ts-expect-error ignore
          e.target.name = field.name; // had code the blur event to detect touch in formik
          field.onBlur(e);
        }}
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {(items || allClotingSize)?.map((size) => {
            const active = multi
              ? (state as Array<PostClothingSize>)?.find((c) => c.name === size.name)
              : (state as PostClothingSize)?.name === size.name;

            return (
              <RadioGroup.Option
                key={size.name}
                value={size}
                disabled={!size.inStock}
                onClick={() => handleClick(size)}
                className={cn(
                  size.inStock
                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                  active ? 'ring-2 ring-indigo-500' : '',
                  'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                )}
              >
                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                {size.inStock ? (
                  <span
                    className={cn(
                      active ? 'border' : 'border-2',
                      active ? 'border-indigo-500' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-md',
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                  >
                    <svg
                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      stroke="currentColor"
                    >
                      <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                    </svg>
                  </span>
                )}
              </RadioGroup.Option>
            );
          })}
        </div>
      </RadioGroup>
    </FormFieldWrapper>
  );
};
