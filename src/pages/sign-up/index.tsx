import { Formik, Field } from "formik";
import { useAuth } from "../../features/auth";
import { getClassNames } from "../../constants/styles";
import { Link } from "react-router-dom";
import { useRouter } from "../../features/router";
import { getFormError } from "../../utils/validation";

export const SignUp = () => {
  const { onSignUp } = useAuth();
  const { pushRoute } = useRouter();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
          }}
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
                field: "password",
                type: "required",
              },
              {
                field: "name",
                type: "required",
              },
              {
                field: "confirmPassword",
                type: "equal",
                equalField: 'password'
              },
            ]);
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { email, password, name } = values;

            onSignUp.fetch(
              { email, password, name },
              {
                onAfterSuccess: () => {
                  setSubmitting(false);

                  pushRoute("/validate-account");
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
                    Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="name"
                      name="name"
                      autoComplete="name"
                      className={getClassNames().auth.input}
                    />
                    {errors.name && touched.name && errors.name}
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
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className={getClassNames().auth.label}
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      className={getClassNames().auth.input}
                    />
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className={getClassNames().auth.label}
                    >
                      Confirm Password
                    </label>
                  </div>

                  <div className="mt-2">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="confirmPassword"
                      className={getClassNames().auth.input}
                    />
                    {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={getClassNames().auth.button}
                  >
                    Register
                  </button>
                </div>

                <div className="w-100 text-sm flex pt-4">
                  <Link
                    to="/sign-in"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 ml-auto"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
