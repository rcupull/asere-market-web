import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInput } from 'components/field-input';

import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useRouter } from 'hooks/useRouter';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { useAuthSignUpModal } from '../useAuthSignUpModal';

import { Formik } from 'formik';

export const useAuthSignInModal = () => {
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  return {
    open: () => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { authSignIn } = useAuth();
            const { onClose } = useModal();
            const authSignUpModal = useAuthSignUpModal();

            const getFormErrors = useGetFormErrors();
            const submitportal = useSubmitPortal();

            const content = (
              <div className="flex min-h-full flex-col justify-center">
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

                <div className="mt-10">
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={() => {}}
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
                          />

                          <FieldInput
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            label="Contraseña"
                            className="mt-6"
                          />

                          {submitportal.getPortal(
                            <Button
                              label="Iniciar sesión"
                              isBusy={authSignIn.status.isBusy}
                              disabled={!isValid}
                              onClick={() => {
                                const { email, password } = values;

                                authSignIn.fetch({ email, password }, {
                                  onAfterSuccess: ()=>{
                                    onClose();
                                  }
                                });
                              }}
                              className="w-full"
                            />,
                          )}

                          <div className="w-100 text-sm pt-4">
                            No tienes una cuenta?{' '}
                            <Button
                              variant="link"
                              className="!inline-block !whitespace-pre-line"
                              label="Regístrate gratis"
                              onClick={() => {
                                onClose();
                                setTimeout(()=>authSignUpModal.open(), 50);
                              }}
                            />{' '}
                            para obtener los beneficios de nuestro sistema. También puedes{' '}
                            <Button
                              variant="link"
                              className="!inline-block !whitespace-pre-line"
                              label="saber más de nosotros"
                              onClick={() => {
                                onClose();
                                pushRoute('/about-us')
                              }}
                            />{' '}
                            o darle un vistazo a nuestros{' '}
                            <Button
                              variant="link"
                              className="!inline-block !whitespace-pre-line"
                              label="planes premium y gratuitos"
                              onClick={() => {
                                onClose();
                                pushRoute('/payment-plans')
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
