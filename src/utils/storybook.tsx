import { ChildrenProp } from "../types/general";
import { Formik } from "formik";
export const FormikWrapper = ({ children }: ChildrenProp) => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => {
        return <form>{children}</form>;
      }}
    </Formik>
  );
};
