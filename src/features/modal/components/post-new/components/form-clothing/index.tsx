import { useEffect, useState } from 'react';

import { Button } from 'components/button';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { FieldSelect } from 'components/field-select';
import { FieldTextArea } from 'components/field-text-area';

import { useAddManyUserBusinessImages } from 'features/api/useAddManyUserBusinessImages';
import { useAddOneUserPost } from 'features/api/useAddOneUserPost';
import { useUpdateOneUserPost } from 'features/api/useUpdateOneUserPost';
import { useModal } from 'features/modal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';

import { PostNewFormProps } from '../../types';

import { Formik } from 'formik';
import { Post, PostCurrency, PostImage } from 'types/post';
import { getImageEndpoint } from 'utils/api';

export interface FormClothingProps extends PostNewFormProps {}

type State = Pick<
  Post,
  'name' | 'currency' | 'clothingSizes' | 'colors' | 'description' | 'price' | 'details'
> & { images: Array<File | PostImage> };

export const FormClothing = ({
  routeName,
  submitPortal,
  onAfterSuccess,
  post,
}: FormClothingProps) => {
  const { onClose } = useModal();

  const [initialValues, setInitialValues] = useState<State>({
    name: '',
    price: 0,
    currency: 'CUP',
    details: '',
    description: '',
    colors: [],
    clothingSizes: [],
    images: [],
  });

  useEffect(() => {
    if (post) {
      setInitialValues({ ...initialValues, ...post });
    }
  }, [post]);

  const { addOneUserPost } = useAddOneUserPost();
  const { updateOneUserPost } = useUpdateOneUserPost();

  const { addManyUserBusinessImages } = useAddManyUserBusinessImages();

  const getFormErrors = useGetFormErrors();

  return (
    <Formik<State>
      initialValues={initialValues}
      enableReinitialize
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
            <FieldInput name="name" label="Nombre del producto" />

            <FieldTextArea label="Descripción" name="description" rows={3} className="mt-6" />

            <FieldTextArea
              id="post_details"
              name="details"
              label="Detalles del producto"
              className="mt-6"
              rows={3}
            />

            <FieldInputImages
              label="Imagen"
              id="images"
              name="images"
              className="mt-6"
              getImageSrc={getImageEndpoint}
              multi
              max={5}
            />

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
                isBusy={addOneUserPost.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const {
                    images,
                    currency,
                    description,
                    name,
                    price,
                    clothingSizes,
                    colors,
                    details,
                  } = values;

                  const handleSubmit = (images?: Array<PostImage>) => {
                    if (post) {
                      return updateOneUserPost.fetch(
                        {
                          postId: post._id,
                          images,
                          currency,
                          description,
                          name,
                          price,
                          clothingSizes,
                          colors,
                          details,
                        },
                        {
                          onAfterSuccess: (response) => {
                            onAfterSuccess?.(response);
                            onClose();
                          },
                        },
                      );
                    }

                    addOneUserPost.fetch(
                      {
                        currency,
                        description,
                        name,
                        price,
                        clothingSizes,
                        colors,
                        details,
                        routeName,
                        images,
                      },
                      {
                        onAfterSuccess: (response) => {
                          onAfterSuccess?.(response);
                          onClose();
                        },
                      },
                    );
                  };

                  if (images.length) {
                    const promises = images.map((image) => {
                      return new Promise<PostImage>((resolve) => {
                        if (image instanceof File) {
                          addManyUserBusinessImages.fetch(
                            { images: [image], routeName },
                            {
                              onAfterSuccess: (response) => {
                                const [imageResponse] = response;
                                resolve({
                                  src: imageResponse.imageSrc,
                                });
                              },
                            },
                          );
                        } else {
                          resolve(image);
                        }
                      });
                    });

                    Promise.all(promises).then((images) =>  handleSubmit(images));
                  } else {
                    handleSubmit();
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
