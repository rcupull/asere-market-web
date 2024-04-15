import { Link } from 'react-router-dom';

import { Button } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';

import { useAuthSignUp } from 'features/api/auth/useAuthSignUp';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useRouter } from 'hooks/useRouter';

import { Formik } from 'formik';

export const SignUp = () => {
  const { authSignUp } = useAuthSignUp();
  const { pushRoute, search } = useRouter();
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
          Resgistrarse
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            canCreateBusiness: false,
          }}
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
              {
                field: 'name',
                type: 'required',
              },
              {
                field: 'confirmPassword',
                type: 'equal',
                equalField: 'password',
              },
            ]);
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { email, password, name, canCreateBusiness } = values;

            authSignUp.fetch(
              { email, password, name, canCreateBusiness },
              {
                onAfterSuccess: () => {
                  setSubmitting(false);

                  pushRoute(`/auth/validate-account${search}`);
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
                <FieldInput id="name" name="name" autoComplete="name" label="Nombre" />

                <FieldInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Correo electrónico"
                  className="mt-6"
                />

                <div className="relative">
                  <FieldInput
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    label="Contraseña"
                    className="mt-6"
                  />
                  {/* <div className="absolute top-0 right-0 text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>

                <FieldInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirmar contraseña"
                  className="mt-6"
                />

                <FieldCheckbox
                  name="canCreateBusiness"
                  label="Propietario de negocios"
                  className="mt-6"
                />

                <Button
                  label="Registrar"
                  type="submit"
                  disabled={isSubmitting}
                  isBusy={authSignUp.status.isBusy}
                  className="mt-6 w-full"
                />

                <div className="w-100 text-sm flex pt-4">
                  <Link
                    to={`/auth/sign-in${search}`}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 ml-auto"
                  >
                    Iniciar sesión
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
