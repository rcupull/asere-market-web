import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldCheckEditor } from 'components/field-check-editor';
import { FieldInput } from 'components/field-input';
import { FieldToggleButton } from 'components/field-toggle-button';

import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';
import { useModal } from 'features/modal/useModal';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { Business, BusinessAboutUsPage } from 'types/business';

interface State extends BusinessAboutUsPage {}

export const useBusinessUpdateAboutUs = () => {
  const { pushModal } = useModal();

  return {
    open: (args: { business: Business; onRefresh: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { business, onRefresh } = args;
            const { routeName } = business;
            const { onClose } = useModal();

            const submitportal = useSubmitPortal();
            const { updateOneUserBusiness } = useUpdateOneUserBusiness();

            const content = (
              <>
                <Formik<State>
                  initialValues={{
                    visible: business?.aboutUsPage?.visible || false,
                    title: business?.aboutUsPage?.title || '',
                    description: business?.aboutUsPage?.description || '',
                  }}
                  enableReinitialize
                  onSubmit={() => {}}
                >
                  {({ values, isValid }) => {
                    return (
                      <form className="w-full">
                        <FieldToggleButton label="Visible" name="visible" />

                        <FieldInput label="Título de la página" name="title" className="mt-6" />

                        <FieldCheckEditor
                          label="Descripción"
                          name="description"
                          className="mt-6"
                          classNameContainer="max-h-[50vh]"
                        />

                        {submitportal.getPortal(
                          <Button
                            label="Guardar"
                            isBusy={updateOneUserBusiness.status.isBusy}
                            disabled={!isValid}
                            onClick={() => {
                              updateOneUserBusiness.fetch(
                                {
                                  update: {
                                    aboutUsPage: values,
                                  },
                                  routeName,
                                },
                                {
                                  onAfterSuccess: () => {
                                    onRefresh();
                                    onClose();
                                  },
                                },
                              );
                            }}
                            variant="primary"
                            className="w-full"
                          />,
                        )}
                      </form>
                    );
                  }}
                </Formik>
              </>
            );

            return {
              title: 'Presentación de la tienda',
              content,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={submitportal.ref} />,
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
