import { useMemo } from 'react';

import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { FieldInput } from 'components/field-input';
import { FieldInputImages } from 'components/field-input-images';
import { FieldPostCategoriesButtons } from 'components/field-post-categories-buttons';
import { FieldPostPageLayout } from 'components/field-post-page-layout';
import { FieldSelect } from 'components/field-select';
import { FieldTextArea } from 'components/field-text-area';

import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useAddOnePost } from 'features/api/posts/useAddOnePost';
import { useUpdateOnePost } from 'features/api/posts/useUpdateOnePost';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';

import { GetFormErrors, useGetFormErrors } from 'hooks/useGetFormErrors';
import { SubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { OnAfterSuccess } from 'types/api';
import { Image, ImageFile } from 'types/general';
import { Post, PostCurrency } from 'types/post';
import { getImageEndpoint } from 'utils/api';

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
  | 'discount'
  | 'postPageLayout'
> & { images: Array<ImageFile | Image> };

export interface PostFormProps {
  submitPortal: SubmitPortal;
  //
  routeName: string;
  //
  onAfterSuccess: OnAfterSuccess;
  post?: Post | null;
  validations: Parameters<GetFormErrors<State>>[1];
  render: Array<keyof State>;
}

export const PostForm = ({
  routeName,
  //
  submitPortal,
  onAfterSuccess,
  post,
  validations: validationsProp,
  render,
}: PostFormProps) => {
  const { addOnePost } = useAddOnePost();
  const { updateOnePost } = useUpdateOnePost();

  const { userPlan } = useGetUserPaymentPlan();

  const { addManyImages } = useAddManyImages();

  const getFormErrors = useGetFormErrors();

  const validations = useMemo(() => {
    return validationsProp.filter((validation) => render.includes(validation.field));
  }, [JSON.stringify([validationsProp, render])]);

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
        postPageLayout: undefined,
        ...(post || {}),
      }}
      enableReinitialize
      validate={(values) => getFormErrors(values, validations)}
      onSubmit={() => {}}
    >
      {({ values, isValid }) => {
        return (
          <form>
            {render.includes('name') && (
              <>
                <FieldInput name="name" label="Nombre del producto" />
                <Divider />
              </>
            )}

            {render.includes('description') && (
              <>
                <FieldTextArea label="Descripción" name="description" rows={3} className="mt-6" />
                <Divider />
              </>
            )}

            {render.includes('details') && (
              <>
                <FieldTextArea
                  id="post_details"
                  name="details"
                  label="Detalles del producto"
                  className="mt-6"
                  rows={3}
                />
                <Divider />
              </>
            )}

            {render.includes('images') && (
              <>
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
              </>
            )}

            {render.includes('postCategoriesTags') && (
              <>
                <FieldPostCategoriesButtons
                  label="Categorías"
                  name="postCategoriesTags"
                  className="mt-6"
                  routeName={routeName}
                />
                <Divider />
              </>
            )}

            {(render.includes('price') || render.includes('currency')) && (
              <>
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

                  {render.includes('discount') && (
                    <FieldInput
                      id="post_discount"
                      name="discount"
                      label="Descuento"
                      type="number"
                      className="mt-6 w-full"
                    />
                  )}
                </div>
                <Divider />
              </>
            )}

            {render.includes('colors') && (
              <>
                <FieldColorSelect label="Colores" name="colors" className="mt-6" multi />
                <Divider />
              </>
            )}

            {render.includes('clothingSizes') && (
              <>
                <FieldClothingSizeSelect
                  label="Tallas"
                  name="clothingSizes"
                  className="mt-6"
                  multi
                />
                <Divider />
              </>
            )}

            {render.includes('postPageLayout') && (
              <>
                <FieldPostPageLayout
                  label="Diseño de la página de la publicación"
                  name="postPageLayout"
                  className="w-full"
                  routeName={routeName}
                />
                <Divider />
              </>
            )}

            {submitPortal.getPortal(
              <Button
                label="Guardar"
                isBusy={addOnePost.status.isBusy || updateOnePost.status.isBusy}
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
                    discount,
                    postPageLayout,
                  } = values;

                  const handelUpdatePost = (post: Post) => {
                    const { _id: postId } = post;

                    addManyImages.fetch(
                      { images, routeName, postId, userId: post.createdBy },
                      {
                        onAfterSuccess: (images) => {
                          updateOnePost.fetch(
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
                              discount,
                              postPageLayout,
                            },
                            {
                              onAfterSuccess,
                            },
                          );
                        },
                      },
                    );
                  };
                  const handelAddPost = () => {
                    addOnePost.fetch(
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
                        discount,
                        postPageLayout,
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
