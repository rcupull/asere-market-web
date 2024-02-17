import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInput } from 'components/field-input';
import { FieldSelect } from 'components/field-select';
import { Modal } from 'components/modal';

import { useAddOneUserBusiness } from 'features/api/useAddOneUserBusiness';
import { useGetAllBusiness } from 'features/api/useGetAllBusiness';
import { useModal } from 'features/modal/useModal';

import { UpdateId, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useDebouncer } from 'hooks/useDebouncer';
import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { FormRouteName } from 'pages/@common/form-route-name';
import { Business, BusinessCategory } from 'types/business';
import { getBusinessCategoryLabel, getRouteName } from 'utils/business';

export interface BusinessNewProps {
  updateId?: UpdateId;
}

export const BusinessNew = ({ updateId }: BusinessNewProps) => {
  const { onClose } = useModal();

  const { onCallAfar } = useCallFromAfar();
  const onRefresh = (newBussiness: Business) => onCallAfar(updateId, newBussiness);

  const { getAllBusiness } = useGetAllBusiness();

  const { addOneUserBusiness } = useAddOneUserBusiness();

  const debouncer = useDebouncer();

  const submitPortal = useSubmitPortal();

  const getFormErrors = useGetFormErrors();

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
                  getAllBusiness.fetch(
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
      {({ errors, values, isValid }) => {
        return (
          <form>
            <FieldInput
              id="business-name"
              name="name"
              autoComplete="business-name"
              label="Nombre del negocio"
            />

            <FormRouteName
              routeName={getRouteName(values.name)}
              error={routeValidationErrorMessage === errors.name}
              className="mt-3"
            />

            <FieldSelect<{ category: BusinessCategory; label: string }>
              items={[
                {
                  category: 'food',
                  label: getBusinessCategoryLabel('food'),
                },
                {
                  category: 'clothing',
                  label: getBusinessCategoryLabel('clothing'),
                },
                {
                  category: 'service',
                  label: getBusinessCategoryLabel('service'),
                },
                {
                  category: 'tool',
                  label: getBusinessCategoryLabel('tool'),
                },
              ]}
              renderOption={({ label }) => label}
              renderValue={({ label }) => label}
              optionToValue={({ category }) => category}
              name="category"
              label="Categoría"
              className="mt-6"
            />

            {submitPortal.getPortal(
              <Button
                label="Guardar"
                isBusy={addOneUserBusiness.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { category, name } = values;

                  addOneUserBusiness.fetch(
                    {
                      category,
                      name,
                      routeName: getRouteName(name),
                    },
                    {
                      onAfterSuccess: (response) => {
                        onClose();
                        onRefresh(response);
                      },
                    },
                  );
                }}
                variant="primary"
                className="w-full"
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
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
