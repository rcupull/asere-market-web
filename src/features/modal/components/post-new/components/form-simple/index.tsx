import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';
import { FieldSelect } from 'components/field-select';
import { FieldTextArea } from 'components/field-text-area';

import { useAddOneUserPost } from 'features/api/useAddOneUserPost';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';

import { PostNewFormProps } from '../../types';

import { Formik } from 'formik';
import { Post, PostCurrency } from 'types/post';

export interface FormSimpleProps extends PostNewFormProps {}

export const FormSimple = ({
  routeName,
  submitPortal,
  onAfterSuccess,
}: FormSimpleProps): React.ReactNode => {
  const { onClose } = useModal();

  const { addOneUserPost } = useAddOneUserPost();
  const getFormErrors = useGetFormErrors();

  return (
    <Formik<Pick<Post, 'name' | 'description' | 'currency' | 'price'>>
      initialValues={{
        description: '',
        name: '',
        currency: 'CUP',
        price: 0,
      }}
      validate={(values) => {
        return getFormErrors(values, [
          {
            field: 'description',
            type: 'required',
          },
          {
            field: 'name',
            type: 'required',
          },
          {
            field: 'currency',
            type: 'required',
          },
          {
            field: 'price',
            type: 'required',
          },
        ]);
      }}
      onSubmit={() => {}}
    >
      {({ values, isValid }) => {
        return (
          <form>
            <FieldInput
              id="post_name"
              name="name"
              autoComplete="post_name"
              label="Nombre del producto"
            />

            <FieldTextArea
              id="post_description"
              name="description"
              autoComplete="post_description"
              label="Descripción"
              className="mt-6"
            />

            <FieldInput
              id="post_price"
              name="price"
              autoComplete="post_price"
              label="Precio"
              type="number"
              className="mt-6"
            />

            <FieldSelect<{ currency: PostCurrency }>
              items={[
                {
                  currency: 'CUP',
                },
                {
                  currency: 'MLC',
                },
                {
                  currency: 'USD',
                },
              ]}
              renderOption={({ currency }) => currency}
              renderValue={({ currency }) => currency}
              optionToValue={({ currency }) => currency}
              name="currency"
              label="Moneda"
              className="mt-6"
            />

            {submitPortal.getPortal(
              <Button
                label="Guardar"
                isBusy={addOneUserPost.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { description, name, currency, price } = values;

                  addOneUserPost.fetch(
                    {
                      name,
                      routeName,
                      currency,
                      description,
                      price,
                    },
                    {
                      onAfterSuccess: (response) => {
                        onAfterSuccess?.(response);
                        onClose();
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
};
