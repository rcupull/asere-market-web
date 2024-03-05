import { Link } from 'react-router-dom';

import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { useAuthSignIn } from 'features/api/useAuthSignIn';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useRouter } from 'hooks/useRouter';

import { Formik } from 'formik';

export const SignIn = () => {
  const { authSignIn } = useAuthSignIn();

  const { pushRoute, search, query } = useRouter();
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
          Inicia sesión en tu cuenta
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

            authSignIn.fetch(
              { email, password },
              {
                onAfterSuccess: () => {
                  setSubmitting(false);

                  const { redirect } = query;

                  pushRoute(redirect ? `${redirect}` : '/dashboard');
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
                <FieldInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Correo Electrónico"
                />

                <FieldInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  label="Contraseña"
                  className="mt-6"
                />

                <Button
                  label="Iniciar sesión"
                  type="submit"
                  disabled={isSubmitting}
                  isBusy={authSignIn.status.isBusy}
                  className="mt-6 w-full"
                />

                <div className="w-100 text-sm pt-4">
                  No tienes una cuenta?{' '}
                  <Link
                    to={`/sign-up${search}`}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 ml-auto"
                  >
                    Regístrate gratis
                  </Link>{' '}
                  para obtener los beneficios de nuestro sistema. También puedes{' '}
                  <Link
                    to="/about-us"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 ml-auto"
                  >
                    saber más de nosotros
                  </Link>{' '}
                  o darle un vistazo a nuestros{' '}
                  <Link
                    to="/payment-plans"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 ml-auto"
                  >
                    planes premium y gratuitos
                  </Link>.
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
