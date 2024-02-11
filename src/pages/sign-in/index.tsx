import { Link } from 'react-router-dom';

import { Button } from 'components/button';
import { Input } from 'components/input';

import { useAuth } from 'features/auth';
import { useRouter } from 'features/router';

import { useGetFormErrors } from 'hooks/useGetFormErrors';

import { Formik } from 'formik';

export const SignIn = () => {
  const { onSignIn } = useAuth();

  const { pushRoute } = useRouter();
  const getFormErrors = useGetFormErrors();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            return getFormErrors(values, [
              {
                field: 'email',
                type: 'required',
              },
              {
                field: 'email',
                type: 'email',
              },
              {
                field: 'password',
                type: 'required',
              },
            ]);
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { email, password } = values;

            onSignIn.fetch(
              { email, password },
              {
                onAfterSuccess: () => {
                  setSubmitting(false);
                  pushRoute('/dashboard');
                },
                onAfterFailed: () => {
                  setSubmitting(false);
                },
              },
            );
          }}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Email address"
                />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  label="Password"
                  className="mt-6"
                />

                <Button
                  label="Sign in"
                  type="submit"
                  disabled={isSubmitting}
                  isBusy={onSignIn.status.isBusy}
                  className="mt-6 w-full"
                />

                <div className="w-100 text-sm flex pt-4">
                  <Link
                    to="/sign-up"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 ml-auto"
                  >
                    Register
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
