import { Button } from 'components/button';
import { Input } from 'components/input';

import { useAuth } from 'features/auth';
import { useRouter } from 'features/router';

import { Formik } from 'formik';
import { getFormError } from 'utils/validation';

export const ValidateAccount = () => {
  const { onValidate } = useAuth();
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
          Validate Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: '', code: '' }}
          validate={(values) => {
            return getFormError(values, [
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
              },
            );
          }}
        >
          {({ errors, touched, handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Input
                  id="code"
                  name="code"
                  autoComplete="off"
                  label="Code"
                  error={errors.code && touched.code && errors.code}
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

                <Button
                  label="Validate"
                  type="submit"
                  disabled={isSubmitting}
                  isBusy={onValidate.status.isBusy}
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
