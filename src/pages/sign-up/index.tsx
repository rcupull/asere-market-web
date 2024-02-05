import { Formik } from "formik";
import { useAuth } from "../../features/auth";
import { Link } from "react-router-dom";
import { useRouter } from "../../features/router";
import { getFormError } from "../../utils/validation";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

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
            return getFormError(values, [
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
                equalField: "password",
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

                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  label="Nombre de la tienda"
                  error={errors.name && touched.name && errors.name}
                />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Email address"
                  error={errors.email && touched.email && errors.email}
                  className="mt-6"
                />

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    label="Password"
                    error={
                      errors.password && touched.password && errors.password
                    }
                    className="mt-6"
                  />
                  <div className="absolute top-0 right-0 text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  error={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword
                  }
                  className="mt-6"
                />

                <Button
                  label="Register"
                  type="submit"
                  disabled={isSubmitting}
                  isBusy={onSignUp.status.isBusy}
                  className="mt-6 w-full"
                />

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
