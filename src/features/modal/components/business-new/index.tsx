import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { Input } from 'components/input';
import { Modal } from 'components/modal';
import { Select } from 'components/select';

import { useBusinessApi } from 'features/business/api';
import { useModal } from 'features/modal';

import { useDebouncer } from 'hooks/useDebouncer';
import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { FormRouteName } from 'pages/@common/form-route-name';
import { BusinessCategory } from 'types/business';
import { getRouteName } from 'utils/business';

export interface BusinessNewProps {
  onAfterSuccess?: (response: any) => void;
}

export const BusinessNew = ({ onAfterSuccess }: BusinessNewProps) => {
  const { onClose } = useModal();

  const businessApi = useBusinessApi();
  const debouncer = useDebouncer();

  const submitPortal = useSubmitPortal();

  const { getFormErrors } = useGetFormErrors();

  const routeValidationErrorMessage = 'Ese nombre de negocio ya existe.';

  const newPostForm = (
    <Formik
      initialValues={{
        category: '',
        name: '',
      }}
      validate={(values) => {
        return getFormErrors(values, [
          {
            field: 'category',
            type: 'required',
          },
          {
            field: 'name',
            type: 'required',
          },
          {
            field: 'name',
            type: 'custom',
            message: routeValidationErrorMessage,
            customCb: async (name) => {
              const routeName = getRouteName(name);
              return new Promise((resolve) => {
                debouncer(() => {
                  businessApi.getAllPublic.fetch(
                    { routeName },
                    {
                      onAfterSuccess: (response) => {
                        const { data } = response;
                        const exists = !!data.length;
                        resolve(!exists);
                      },
                    },
                  );
                }, 500);
              });
            },
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
              error={errors.name}
            />

            <FormRouteName
              routeName={getRouteName(values.name)}
              error={routeValidationErrorMessage === errors.name}
              className="mt-3"
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
                      routeName: getRouteName(name),
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
      secondaryBtn={<ButtonClose />}
    />
  );
};
