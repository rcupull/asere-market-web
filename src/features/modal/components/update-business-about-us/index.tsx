import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldCheckEditor } from 'components/field-check-editor';
import { FieldInput } from 'components/field-input';
import { FieldToggleButton } from 'components/field-toggle-button';
import { Modal } from 'components/modal';

import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { BusinessAboutUsPage } from 'types/business';

interface State extends BusinessAboutUsPage {}

export interface UpdateBusinessAboutUsProps {
  routeName: string;
  callAfarResources?: CallAfarResources;
}

export const UpdateBusinessAboutUs = ({
  routeName,
  callAfarResources,
}: UpdateBusinessAboutUsProps) => {
  const { getOneUserBusiness } = useGetOneUserBusiness();
  const { onCallAfar } = useCallFromAfar();
  const business = getOneUserBusiness.data;
  const { onClose } = useModal();
  const onRefresh = () => getOneUserBusiness.fetch({ routeName });

  useEffect(() => {
    onRefresh();

    return () => onCallAfar(callAfarResources);
  }, []);

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

  return (
    <Modal
      title="Presentación de la tienda"
      content={content}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitportal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
