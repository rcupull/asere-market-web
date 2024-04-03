import { Accordion } from 'components/accordion';
import { FieldPostContactSelect } from 'components/field-post-contact-select';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';
import { useNestedForm } from 'hooks/useNestedForm';

import { PostPageLayout } from 'types/business';
import { AnyRecord } from 'types/general';
import { cn } from 'utils/general';

export interface FieldPostPageLayoutProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {
  collapsable?: boolean;
}

export const FieldPostPageLayout = ({
  className,
  label,
  collapsable,
  ...props
}: FieldPostPageLayoutProps) => {
  const { field, error } = useFormikField(props);

  const { getFieldName } = useNestedForm<PostPageLayout>({
    field,
    initialValues: {
      contact: undefined,
    },
  });

  const content = (
    <div className="flex flex-col justify-around h-full px-6 gap-2">
      <FieldPostContactSelect label="Contacto" name={getFieldName('contact')} />
    </div>
  );
  return (
    <FormFieldWrapper label={label} error={error} className={cn(className)}>
      {collapsable ? <Accordion header="Abrir">{content}</Accordion> : content}
    </FormFieldWrapper>
  );
};
