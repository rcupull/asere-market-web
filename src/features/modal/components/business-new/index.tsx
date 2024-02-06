import { Button } from 'components/button';
import { Input } from 'components/input';
import { Modal } from 'components/modal';
import { Select } from 'components/select';

import { useBusinessApi } from 'features/business/api';
import { useModal } from 'features/modal';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { BusinessCategory } from 'types/business';
import { getFormError } from 'utils/validation';

export interface BusinessNewProps {
  onAfterSuccess?: (response: any) => void;
}

export const BusinessNew = ({ onAfterSuccess }: BusinessNewProps) => {
  const { onClose } = useModal();

  const businessApi = useBusinessApi();

  const submitPortal = useSubmitPortal();

  const newPostForm = (
    <Formik
      initialValues={{
        category: '',
        name: '',
      }}
      validate={(values) => {
        return getFormError(values, [
          {
            field: 'category',
            type: 'required',
          },
          {
            field: 'name',
            type: 'required',
          },
        ]);
      }}
      onSubmit={() => {}}
    >
      {({ errors, touched, handleChange, values, isValid }) => {
        return (
          <form>
            <Input
              id="business-name"
              name="name"
              autoComplete="business-name"
              label="Nombre del negocio"
              onChange={handleChange}
              error={errors.name && touched.name && errors.name}
            />

            <Select<{ category: BusinessCategory; label: string }>
              items={[
                {
                  category: 'food',
                  label: 'Comida',
                },
                {
                  category: 'clothing',
                  label: 'Vestuario',
                },
                {
                  category: 'service',
                  label: 'Servicios',
                },
                {
                  category: 'tool',
                  label: 'Herramientas',
                },
              ]}
              renderOption={({ label }) => label}
              renderValue={({ label }) => label}
              optionToValue={({ category }) => category}
              name="category"
              onChange={handleChange}
              label="Categoría"
              error={errors.category && touched.category && errors.category}
              className="mt-6"
            />

            {submitPortal.getPortal(
              <Button
                label="Guardar"
                isBusy={businessApi.addOne.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { category, name } = values;

                  businessApi.addOne.fetch(
                    {
                      category,
                      name,
                    },
                    {
                      onAfterSuccess: (response) => {
                        onClose();
                        onAfterSuccess?.(response);
                      },
                    },
                  );
                }}
                variant="primary"
              />,
            )}
          </form>
        );
      }}
    </Formik>
  );

  return (
    <Modal
      title="Crear Negocio"
      content={newPostForm}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={<Button label="Cerrar" onClick={() => onClose()} variant="outlined" />}
    />
  );
};
