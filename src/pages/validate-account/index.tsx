import { Formik, Field } from "formik";
import { useAuth } from "../../features/auth";
import { getClassNames } from "../../constants/styles";
import { useRouter } from "../../features/router";
import { getFormError } from "../../utils/validation";

export const ValidateAccount = () => {
  const { onValidate } = useAuth();
  const { pushRoute } = useRouter()

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Validate Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: "", code: "" }}
          validate={(values) => {

            return  getFormError(values, [
              {
                field: "email",
                type: "required",
              },
              {
                field: "email",
                type: "email",
              },
              {
                field: "code",
                type: "required",
              },
            ]);
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { email, code } = values;

            onValidate.fetch(
              { email, code },
              {
                onAfterSuccess: () => {
                  setSubmitting(false);
                  pushRoute('/sign-in');
                },
                onAfterFailed: () => {
                  setSubmitting(false);
                },
              }
            );
          }}
        >
          {({ errors, touched, handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className={getClassNames().auth.label}>
                    Code
                  </label>
                  <div className="mt-2">
                    <Field
                      id="code"
                      name="code"
                      autoComplete="off"
                      className={getClassNames().auth.input}
                    />
                    {errors.code && touched.code && errors.code}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="email" className={getClassNames().auth.label}>
                    Email address
                  </label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={getClassNames().auth.input}
                    />
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={getClassNames().auth.button}
                  >
                    Validate
                  </button>
                </div>

              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
