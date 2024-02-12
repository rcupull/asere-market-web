import { Button } from 'components/button';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { FieldSelect } from 'components/field-select';
import { FieldTextArea } from 'components/field-text-area';

import { useImagesApi } from 'features/images/api';
import { useModal } from 'features/modal';
import { useUserApi } from 'features/user/api';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { SubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { OnAfterSuccess } from 'types/api';
import { Post, PostCurrency } from 'types/post';

export interface FormClothingProps {
  submitPortal: SubmitPortal;
  routeName: string;
  onAfterSuccess?: OnAfterSuccess;
}

export const FormClothing = ({ routeName, submitPortal, onAfterSuccess }: FormClothingProps) => {
  const { onClose } = useModal();

  const userApi = useUserApi();
  const imagesApi = useImagesApi();
  const getFormErrors = useGetFormErrors();

  return (
    <Formik<
      Pick<
        Post,
        'name' | 'currency' | 'clothingSizes' | 'colors' | 'description' | 'price' | 'details'
      > & { images: Array<File> }
    >
      initialValues={{
        name: '',
        price: 0,
        currency: 'CUP',
        details: '',
        description: '',
        colors: [],
        clothingSizes: [],
        images: [],
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
          {
            field: 'clothingSizes',
            type: 'required',
          },
        ]);
      }}
      onSubmit={() => {}}
    >
      {({ values, isValid }) => {
        return (
          <form>
            <FieldInput name="name" label="Nombre del producto" />

            <FieldTextArea label="Descripción" name="description" rows={3} className="mt-6" />

            <FieldTextArea
              id="post_details"
              name="details"
              label="Detalles del producto"
              className="mt-6"
              rows={3}
            />

            <FieldInputImages label="Imagen" id="images" name="images" className="mt-6" />

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <FieldInput
                id="post_price"
                name="price"
                label="Precio"
                type="number"
                className="mt-6 w-full"
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
                className="mt-6 w-full"
              />
            </div>

            <FieldColorSelect label="Colores" name="colors" className="mt-6" multi />

            <FieldClothingSizeSelect label="Tallas" name="clothingSizes" className="mt-6" multi />

            {submitPortal.getPortal(
              <Button
                label="Guardar"
                isBusy={userApi.addOnePost.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { images } = values;

                  if (images.length) {
                    imagesApi.addPostImages.fetch(
                      { postImages: images, routeName },
                      {
                        onAfterSuccess: (response) => {
                          userApi.addOnePost.fetch(
                            {
                              ...values,
                              routeName,
                              images: response.map(({ imageSrc }) => ({ src: imageSrc })),
                            },
                            {
                              onAfterSuccess: (response) => {
                                onAfterSuccess?.(response);
                                onClose();
                              },
                            },
                          );
                        },
                      },
                    );
                  }
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
