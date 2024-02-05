import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { Modal } from "../../../../components/modal";
import { useFetch } from "../../../../hooks/useFetch";
import { getEndpoint } from "../../../../utils/api";
import { getFormError } from "../../../../utils/validation";
import { useModal } from "../..";
import { Formik } from "formik";
import { useSubmitPortal } from "../../../../hooks/useSubmitPortal";

export interface PostNewProps {

}

export const PostNew = () => {
  const { onClose } = useModal();

  const [, { isBusy }, handleCall] = useFetch();

  const submitPortal = useSubmitPortal();

  const newPostForm = (
    <Formik
      initialValues={{
        description: "",
        name: "",
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
        ]);
      }}
      onSubmit={() => {}}
    >
      {({ errors, touched, handleChange, values, isValid }) => {
        return (
          <form>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              label="Nombre del producto"
              onChange={handleChange}
              error={errors.name && touched.name && errors.name}
            />

            <Input
              id="description"
              name="description"
              autoComplete="description"
              label="Descripción"
              onChange={handleChange}
              error={
                errors.description && touched.description && errors.description
              }
              className="mt-6"
            />

            {submitPortal.getPortal(
              <Button
                label="Guardar"
                isBusy={isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { description, name } = values;

                  handleCall({
                    method: "post",
                    url: getEndpoint({
                      path: "/post",
                    }),
                    data: {
                      name,
                      description,
                    },
                  });
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
      title="Deactivate account"
      content={newPostForm}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={
        <Button label="Cerrar" onClick={() => onClose()} variant="outlined" />
      }
    />
  );
};
