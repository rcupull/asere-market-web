import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { IconButtonShowHide } from 'components/icon-button-show-hide';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { StyleProps } from 'types/general';

export interface FieldShowHideProps
  extends StyleProps,
    FormFieldWrapperProps,
    FormikFieldProps<boolean> {
  oposite?: boolean;
}

export const FieldShowHide = (props: FieldShowHideProps) => {
  const { label, className, oposite } = props;

  const { field, error } = useFormikField(props);
  const { value } = field;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <IconButtonShowHide
        hidden={oposite ? !value : value}
        onClick={(e) => {
          e.preventDefault();
          field.onChange({
            target: {
              name: field.name,
              value: !value,
            },
          });
        }}
      />
    </FormFieldWrapper>
  );
};
