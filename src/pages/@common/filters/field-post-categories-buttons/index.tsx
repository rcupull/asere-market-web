import { useEffect, useState } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { useGetOneBusiness } from 'features/api/useGetOneBusiness';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { PostCategoriesFilterButtons } from '../post-categories-filter-buttons';

type State = Array<string>;

export interface FieldPostCategoriesButtonsProps
  extends FormFieldWrapperProps,
    FormikFieldProps<State> {}

export const FieldPostCategoriesButtons = (props: FieldPostCategoriesButtonsProps) => {
  const { className, label } = props;
  const [state, setState] = useState<State>();

  const { field, error } = useFormikField(props);

  const { value, onChange, name, onBlur } = field;

  const { getOneBusiness } = useGetOneBusiness();
  const postCategories = getOneBusiness.data?.postCategories;

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <PostCategoriesFilterButtons
        postCategories={postCategories}
        onChange={(newState) => {
          onBlur({ target: { name } });

          setState(newState);

          onChange({
            target: {
              name,
              value: newState,
            },
          });
        }}
        value={state}
        type="wrapped"
      />
    </FormFieldWrapper>
  );
};
