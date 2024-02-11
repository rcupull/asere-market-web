import { Button } from 'components/button';
import { Input } from 'components/input';
import { Select } from 'components/select';
import { TextArea } from 'components/text-area';

import { useModal } from 'features/modal';
import { useUserApi } from 'features/user/api';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { SubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { OnAfterSuccess } from 'types/api';
import { Post, PostCurrency } from 'types/post';

export interface FormSimpleProps {
  submitPortal: SubmitPortal;
  routeName: string;
  onAfterSuccess?: OnAfterSuccess;
}

export const FormSimple = ({
  routeName,
  submitPortal,
  onAfterSuccess,
}: FormSimpleProps): React.ReactNode => {
  const { onClose } = useModal();

  const userApi = useUserApi();
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
            <Input
              id="post_name"
              name="name"
              autoComplete="post_name"
              label="Nombre del producto"
            />

            <TextArea
              id="post_description"
              name="description"
              autoComplete="post_description"
              label="Descripción"
              className="mt-6"
            />

            <Input
              id="post_price"
              name="price"
              autoComplete="post_price"
              label="Precio"
              type="number"
              className="mt-6"
            />

            <Select<{ currency: PostCurrency }>
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
                isBusy={userApi.addOnePost.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { description, name, currency, price } = values;

                  userApi.addOnePost.fetch(
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
                className='w-full'
              />,
            )}
          </form>
        );
      }}
    </Formik>
  );
};
