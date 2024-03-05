import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { useAuthValidate } from 'features/api/useAuthValidate';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useRouter } from 'hooks/useRouter';

import { Formik } from 'formik';

export const ValidateAccount = () => {
  const { authValidate } = useAuthValidate();
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
          Validate Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: '', code: '' }}
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
                field: 'code',
                type: 'required',
              },
            ]);
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { email, code } = values;

            authValidate.fetch(
              { email, code },
              {
                onAfterSuccess: () => {
                  setSubmitting(false);

                  pushRoute(`/sign-in${search}`);
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
                <FieldInput id="code" name="code" autoComplete="off" label="Code" />

                <FieldInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Correo Electrónico"
                  className="mt-6"
                />

                <Button
                  label="Validate"
                  type="submit"
                  disabled={isSubmitting}
                  isBusy={authValidate.status.isBusy}
                  className="mt-6 w-full"
                />
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
