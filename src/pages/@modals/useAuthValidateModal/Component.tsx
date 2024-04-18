import { Button } from 'components/button';
import { FieldInput } from 'components/field-input';

import { useAuthValidate } from 'features/api/auth/useAuthValidate';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { Portal } from 'hooks/usePortal';

import { useAuthSignInModal } from '../useAuthSignInModal';

import { Formik } from 'formik';

export interface ComponentProps {
  portal: Portal;
  email?: string;
}

export const Component = ({ portal, email = '' }: ComponentProps) => {
  const { authValidate } = useAuthValidate();
  const authSignInModal = useAuthSignInModal();
  const { onClose } = useModal();

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
          Validar Cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email, code: '' }}
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
          onSubmit={() => {}}
        >
          {({ handleSubmit, isValid, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FieldInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Correo Electrónico"
                  className="mt-6"
                />

                <FieldInput
                  id="code"
                  name="code"
                  autoFocus={!!email}
                  autoComplete="off"
                  label="Code"
                />

                {portal.getPortal(
                  <Button
                    label="Validar"
                    isBusy={authValidate.status.isBusy}
                    disabled={!isValid}
                    onClick={() => {
                      const { email, code } = values;

                      authValidate.fetch(
                        { email, code },
                        {
                          onAfterSuccess: () => {
                            onClose();
                            setTimeout(() => authSignInModal.open({ email }), 50);
                          },
                        },
                      );
                    }}
                    className="w-full"
                  />,
                )}
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
