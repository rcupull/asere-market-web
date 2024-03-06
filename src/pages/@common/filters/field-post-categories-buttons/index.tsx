import { useEffect, useState } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { IconButtonAdd } from 'components/icon-button-add';

import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';
import { useMemoizedHash } from 'hooks/useMemoizedHash';

import { PostCategoriesFilterButtons } from '../post-categories-filter-buttons';

type State = Array<string>;

export interface FieldPostCategoriesButtonsProps
  extends FormFieldWrapperProps,
    FormikFieldProps<State> {
  routeName: string;
}

export const FieldPostCategoriesButtons = (props: FieldPostCategoriesButtonsProps) => {
  const { className, label, routeName } = props;
  const [state, setState] = useState<State>();

  const { pushModal } = useModal();
  const { field, error } = useFormikField(props);

  const { value, onChange, name, onBlur } = field;

  const { getOneUserBusiness } = useGetOneUserBusiness();

  const onRefresh = () => getOneUserBusiness.fetch({ routeName });

  const callAfarResources = useMemoizedHash()
  useCallFromAfar(callAfarResources, onRefresh);

  useEffect(() => {
    onRefresh();
  }, []);

  const postCategories = getOneUserBusiness.data?.postCategories;

  useEffect(() => {
    setState(value);
  }, [value]);

  const iconAdd = (
    <IconButtonAdd
      title="Editar las categorías"
      className='text-green-600 font-bold ml-2'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        pushModal(
          'UpdatePostCategories',
          { routeName, callAfarResources },
          { emergent: true },
        );
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
