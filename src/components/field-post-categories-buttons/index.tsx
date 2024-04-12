import { useEffect, useState } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { IconButtonAdd } from 'components/icon-button-add';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { PostCategoriesFilterButtons } from '../post-categories-filter-buttons';

import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';
import { useBusinessUpdatePostCategories } from 'pages/@hooks/useBusinessUpdatePostCategories';

type State = Array<string>;

export interface FieldPostCategoriesButtonsProps
  extends FormFieldWrapperProps,
    FormikFieldProps<State> {
  routeName: string;
}

export const FieldPostCategoriesButtons = (props: FieldPostCategoriesButtonsProps) => {
  const { className, label, routeName } = props;
  const [state, setState] = useState<State>();

  const { field, error } = useFormikField(props);

  const { value, onChange, name, onBlur } = field;

  const businessOwnerData = useBusinessOwnerData();

  const businessUpdatePostCategories = useBusinessUpdatePostCategories();

  useEffect(() => {
    setState(value);
  }, [value]);

  const business = businessOwnerData.data;

  if (!business) {
    return <></>;
  }

  const postCategories = business.postCategories;

  const iconAdd = (
    <IconButtonAdd
      title="Editar las categorías"
      className="text-green-600 font-bold ml-2"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        businessUpdatePostCategories.open({
          routeName: business.routeName,
          onRefresh: () => businessOwnerData.onFetch({ routeName }),
        });
      }}
    />
  );

  return (
    <FormFieldWrapper
      label={
        <div className="flex items-center">
          {label}
          {iconAdd}
        </div>
      }
      error={error}
      className={className}
    >
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
