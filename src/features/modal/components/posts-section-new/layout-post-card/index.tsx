import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { Tabs } from 'components/tabs';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { LayoutPostCardDiscount } from './layouts-post-card-discount';
import { LayoutPostCardImages } from './layouts-post-card-images';
import { LayoutPostCardName } from './layouts-post-card-name';
import { LayoutPostCardPrice } from './layouts-post-card-price';

import { PostCardLayout } from 'types/business';
import { AnyRecord } from 'types/general';
import { cn } from 'utils/general';

export interface FieldLayoutPostCardProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {}

export const FieldLayoutPostCard = ({ className, label, ...props }: FieldLayoutPostCardProps) => {
  const { field, error } = useFormikField(props);

  const { value, onChange, name, onBlur } = field;

  const handleChange = (newState: PostCardLayout) => {
    onBlur({ target: { name } });

    onChange({
      target: {
        name,
        value: newState,
      },
    });
  };

  return (
    <FormFieldWrapper label={label} error={error} className={cn(className)}>
      <Tabs
        items={[
          {
            label: 'Imágenes',
            content: <LayoutPostCardImages value={value} onChange={handleChange} />,
          },
          {
            label: 'Nombre',
            content: <LayoutPostCardName value={value} onChange={handleChange} />,
          },
          {
            label: 'Precio',
            content: <LayoutPostCardPrice value={value} onChange={handleChange} />,
          },
          {
            label: 'Descuento',
            content: <LayoutPostCardDiscount value={value} onChange={handleChange} />,
          },
        ]}
      />
    </FormFieldWrapper>
  );
};
