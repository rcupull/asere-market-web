import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { FieldSelect } from 'components/field-select';
import { FieldTextArea } from 'components/field-text-area';

import { useAddManyUserPostImages } from 'features/api/useAddManyUserPostImages';
import { useAddOneUserPost } from 'features/api/useAddOneUserPost';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useUpdateOneUserPost } from 'features/api/useUpdateOneUserPost';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';

import { PostNewFormProps } from '../../types';

import { Formik } from 'formik';
import { FieldPostCategoriesButtons } from 'pages/@common/filters/field-post-categories-buttons';
import { Image } from 'types/general';
import { Post, PostCurrency } from 'types/post';
import { getImageEndpoint } from 'utils/api';

export interface FormClothingProps extends PostNewFormProps {}

type State = Pick<
  Post,
  | 'name'
  | 'currency'
  | 'clothingSizes'
  | 'colors'
  | 'description'
  | 'price'
  | 'details'
  | 'postCategoriesTags'
> & { images: Array<File | Image> };

export const FormClothing = ({
  routeName,
  submitPortal,
  onAfterSuccess,
  post,
}: FormClothingProps) => {
  const { onClose } = useModal();

  const { addOneUserPost } = useAddOneUserPost();
  const { updateOneUserPost } = useUpdateOneUserPost();

  const { userPlan } = useGetUserPaymentPlan();

  const { addManyUserPostImages } = useAddManyUserPostImages();

  const getFormErrors = useGetFormErrors();

  return (
    <Formik<State>
      initialValues={{
        name: '',
        price: 0,
        currency: 'CUP',
        details: '',
        description: '',
        colors: [],
        clothingSizes: [],
        images: [],
        postCategoriesTags: [],
        ...(post || {}),
      }}
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
            <Divider />

            <FieldTextArea label="Descripción" name="description" rows={3} className="mt-6" />
            <Divider />

            <FieldTextArea
              id="post_details"
              name="details"
              label="Detalles del producto"
              className="mt-6"
              rows={3}
            />
            <Divider />

            <FieldInputImages
              label="Imagen"
              id="images"
              name="images"
              className="mt-6"
              getImageSrc={getImageEndpoint}
              multi
              max={userPlan?.maxImagesByPosts}
            />
            <Divider />

            <FieldPostCategoriesButtons
              label="Categorías"
              name="postCategoriesTags"
              className="mt-6"
              routeName={routeName}
            />
            <Divider />

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
            <Divider />

            <FieldColorSelect label="Colores" name="colors" className="mt-6" multi />
            <Divider />

            <FieldClothingSizeSelect label="Tallas" name="clothingSizes" className="mt-6" multi />
            <Divider />

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
                    postCategoriesTags,
                  } = values;

                  const handelUpdatePost = (post: Post) => {
                    const { _id: postId } = post;

                    addManyUserPostImages.fetch(
                      { images, routeName, postId },
                      {
                        onAfterSuccess: (images) => {
                          updateOneUserPost.fetch(
                            {
                              postId,
                              images,
                              currency,
                              description,
                              name,
                              price,
                              clothingSizes,
                              colors,
                              details,
                              postCategoriesTags,
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
                  };
                  const handelAddPost = () => {
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
                        images: [],
                      },
                      {
                        onAfterSuccess: (response) => {
                          handelUpdatePost(response);
                        },
                      },
                    );
                  };

                  post ? handelUpdatePost(post) : handelAddPost();
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
