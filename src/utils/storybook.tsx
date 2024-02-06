import { Formik } from 'formik';
import { ChildrenProp } from 'types/general';
export const FormikWrapper = ({ children }: ChildrenProp) => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => {
        return <form>{children}</form>;
      }}
    </Formik>
  );
};
