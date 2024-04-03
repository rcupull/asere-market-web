import { useEffect, useState } from 'react';

import { FieldCheckbox } from 'components/field-checkbox';
import { FieldSelect } from 'components/field-select';
import { FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { PostLayoutContact } from 'types/business';
import { AnyRecord } from 'types/general';
import { isNullOrUndefined } from 'utils/general';

export interface FieldPostContactSelectProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {}

export const FieldPostContactSelect = ({ label, ...props }: FieldPostContactSelectProps) => {
  const { field } = useFormikField(props);

  const { value } = field;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(isNullOrUndefined(value));
  }, [value]);

  return (
    <FieldSelect<{ value: PostLayoutContact }>
      label={
        <div className="flex items-center">
          {label}
          <FieldCheckbox
            className="ml-4"
            label="Mantener la misma configuración del negocio"
            noUseFormik
            value={disabled}
            onChange={(e) => {
              const newDisabled = e.target.checked;
              setDisabled(newDisabled);

              field.onBlur({ target: { name: field.name } });

              field.onChange({
                target: {
                  name: field.name,
                  value: newDisabled ? undefined : 'none',
                },
              });
            }}
          />
        </div>
      }
      disabled={disabled}
      renderOption={({ value }) => value}
      renderValue={({ value }) => value}
      optionToValue={({ value }) => value}
      items={[
        {
          value: 'none',
        },
        {
          value: 'whatsApp_xsLink_lgQR',
        },
      ]}
      {...props}
      {...field}
    />
  );
};
