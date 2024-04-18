import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldSelectProps } from 'components/field-select';
import { FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdateInfo } from 'pages/@modals/useBusinessUpdateInfo';
import { PostLayoutSalesMethod } from 'types/business';
import { AnyRecord } from 'types/general';

export interface FieldPostSalesMethodSelectProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {}

export const FieldPostSalesMethodSelect = (props: FieldPostSalesMethodSelectProps) => {
  const { label, ...omittedProps } = props;
  const { field } = useFormikField(props);

  const businessUpdateInfo = useBusinessUpdateInfo();

  const { business, status, onFetch } = useBusiness();

  const getItems = (): FieldSelectProps<{ value: PostLayoutSalesMethod }>['items'] => {
    const out: Array<{ value: PostLayoutSalesMethod }> = [
      {
        value: 'none',
      },
    ];

    if (business?.salesStrategy === 'whatsAppWithOwner_pickUpProduct') {
      out.push({
        value: 'whatsApp_xsLink_lgQR',
      });
    }

    if (business?.salesStrategy === 'addToCart_whatsAppWithOwner_pickUpProduct') {
      out.push({
        value: 'salesCart',
      });
    }

    return out;
  };

  return (
    <FieldRadioGroup<{ value: PostLayoutSalesMethod }>
      label={
        <div className="flex items-center justify-start flex-wrap">
          {label}
          <Button
            variant="link"
            label="Configuración del negocio"
            onClick={(e) => {
              e.preventDefault();
              if (!business) return;

              businessUpdateInfo.open(
                { routeName: business.routeName },
                { onAfterSuccess: () => onFetch({ routeName: business.routeName }) },
              );
            }}
          />
        </div>
      }
      isBusy={status.isBusy}
      renderOption={({ checked, item }) => {
        const labels: Record<PostLayoutSalesMethod, string> = {
          none: 'Ninguna',
          whatsApp_xsLink_lgQR: 'Contactar por whatsapp para los detalles de la compra',
          salesCart: 'Agregar al carrito',
        };
        return <FieldCheckbox noUseFormik value={checked} label={labels[item.value]} />;
      }}
      optionToValue={({ value }) => value}
      items={getItems()}
      {...field}
      {...omittedProps}
    />
  );
};
