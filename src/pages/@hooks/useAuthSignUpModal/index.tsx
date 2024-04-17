import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';

import { useAuthSignUp } from 'features/api/auth/useAuthSignUp';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { useAuthSignInModal } from '../useAuthSignInModal';

import { Formik } from 'formik';

export const useAuthSignUpModal = () => {
  const { pushModal } = useModal();

  return {
    open: () => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { authSignUp } = useAuthSignUp();
            const authSignInModal = useAuthSignInModal();
            const { onClose } = useModal();

            const getFormErrors = useGetFormErrors();
            const submitportal = useSubmitPortal();

            const content = (
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Registrarse
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
                    onSubmit={() => {}}
                  >
                    {({ handleSubmit, isValid, values }) => {
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

                          {submitportal.getPortal(
                            <Button
                              label="Guardar"
                              isBusy={authSignUp.status.isBusy}
                              disabled={!isValid}
                              onClick={() => {
                                const { email, password, name, canCreateBusiness } = values;
                                authSignUp.fetch(
                                  { email, password, name, canCreateBusiness },
                                  {
                                    onAfterSuccess: () => {
                                      // pushRoute(`/auth/validate-account${search}`);
                                    },
                                    onAfterFailed: () => {
                                      // setSubmitting(false);
                                    },
                                  },
                                );
                              }}
                              className="w-full"
                            />,
                          )}

                          <div className="w-100 text-sm flex pt-4">
                            <Button
                              variant="link"
                              label="Iniciar sesión"
                              onClick={() => {
                                onClose();
                                setTimeout(() => authSignInModal.open(), 50);
                              }}
                            />
                          </div>
                        </form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            );

            return {
              content,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={submitportal.ref} />,
              className: '!w-[30rem]',
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
