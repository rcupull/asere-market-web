import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { Modal } from "../../../../components/modal";
import { getFormError } from "../../../../utils/validation";
import { useModal } from "../..";
import { Formik } from "formik";
import { useSubmitPortal } from "../../../../hooks/useSubmitPortal";
import { usePostsApi } from "../../../post/api";
import { Select } from "../../../../components/select";
import { Post, PostCurrency } from "../../../../types/post";

export interface PostNewProps {
  onAfterSuccess?: (response: any) => void;
  businessId: string;
}

export const PostNew = ({ onAfterSuccess, businessId }: PostNewProps) => {
  const { onClose } = useModal();

  const posts = usePostsApi();

  const submitPortal = useSubmitPortal();

  const newPostForm = (
    <Formik<Pick<Post, 'name' | 'description' | 'currency' | 'amountAvailable' | 'price'>>
      initialValues={{
        description: "",
        name: "",
        currency: "CUP",
        price: 0,
        amountAvailable: 0,
      }}
      validate={(values) => {
        return getFormError(values, [
          {
            field: "description",
            type: "required",
          },
          {
            field: "name",
            type: "required",
          },
          {
            field: "currency",
            type: "required",
          },
          {
            field: "price",
            type: "required",
          },
        ]);
      }}
      onSubmit={() => {}}
    >
      {({ errors, touched, handleChange, values, isValid }) => {
        return (
          <form>
            <Input
              id="post_name"
              name="name"
              autoComplete="post_name"
              label="Nombre del producto"
              onChange={handleChange}
              error={errors.name && touched.name && errors.name}
            />

            <Input
              id="post_description"
              name="description"
              autoComplete="post_description"
              label="Descripción"
              onChange={handleChange}
              error={
                errors.description && touched.description && errors.description
              }
              className="mt-6"
            />

            <Input
              id="post_price"
              name="price"
              autoComplete="post_price"
              label="Precio"
              type="number"
              onChange={handleChange}
              error={errors.price && touched.price && errors.price}
              className="mt-6"
            />

            <Select<{ currency: PostCurrency; }>
              items={[
                {
                  currency: "CUP",
                },
                {
                  currency: "MLC",
                },
                {
                  currency: "USD",
                },
              ]}
              renderOption={({ currency }) => currency}
              renderValue={({ currency }) => currency}
              optionToValue={({ currency }) => currency}
              name="currency"
              onChange={handleChange}
              label="Moneda"
              error={errors.currency && touched.currency && errors.currency}
              className="mt-6"
            />

            <Input
              id="post_amountAvailable"
              name="amountAvailable"
              autoComplete="post_amountAvailable"
              label="Cantidad disponible"
              type="number"
              onChange={handleChange}
              error={
                errors.amountAvailable &&
                touched.amountAvailable &&
                errors.amountAvailable
              }
              className="mt-6"
            />

            {submitPortal.getPortal(
              <Button
                label="Guardar"
                isBusy={posts.addOne.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const {
                    description,
                    name,
                    amountAvailable,
                    currency,
                    price,
                  } = values;

                  posts.addOne.fetch(
                    {
                      name,
                      businessId,
                      currency,
                      description,
                      price,
                      amountAvailable,
                    },
                    { onAfterSuccess }
                  );
                }}
                variant="primary"
              />
            )}
          </form>
        );
      }}
    </Formik>
  );

  return (
    <Modal
      title="Nuevo Post"
      content={newPostForm}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={
        <Button label="Cerrar" onClick={() => onClose()} variant="outlined" />
      }
    />
  );
};
