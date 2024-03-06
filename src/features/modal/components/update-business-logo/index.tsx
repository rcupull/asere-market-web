import { useEffect, useMemo } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInputImages } from 'components/field-input-images';
import { Modal } from 'components/modal';

import { useAddManyUserBusinessImages } from 'features/api/useAddManyUserBusinessImages';
import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { Image } from 'types/general';
import { getImageEndpoint } from 'utils/api';

interface State {
  logoField: Array<File | Image | undefined>;
}

export interface UpdateBusinessLogoProps {
  routeName: string;
  callAfarResources?: CallAfarResources;
}

export const UpdateBusinessLogo = ({ routeName, callAfarResources }: UpdateBusinessLogoProps) => {
  const { onClose } = useModal();
  const { getOneUserBusiness } = useGetOneUserBusiness();
  const { onCallAfar } = useCallFromAfar();

  const business = getOneUserBusiness.data;

  useEffect(() => {
    getOneUserBusiness.fetch({ routeName });

    return () => onCallAfar(callAfarResources);
  }, []);

  const { logo } = business || {};

  const submitportal = useSubmitPortal();
  const { updateOneUserBusiness } = useUpdateOneUserBusiness();
  const { addManyUserBusinessImages } = useAddManyUserBusinessImages();

  const initialValues = useMemo<State>(
    () => ({
      logoField: [logo],
    }),
    [logo],
  );

  const content = (
    <Formik<State> initialValues={initialValues} onSubmit={() => {}} enableReinitialize>
      {({ values, isValid }) => {
        return (
          <form>
            <FieldInputImages
              id="logoField"
              name="logoField"
              className="mt-6"
              getImageSrc={getImageEndpoint}
            />

            {submitportal.getPortal(
              <Button
                label="Guardar"
                isBusy={
                  updateOneUserBusiness.status.isBusy || addManyUserBusinessImages.status.isBusy
                }
                disabled={!isValid || initialValues.logoField === values.logoField}
                onClick={() => {
                  const { logoField } = values;

                  const [logo] = logoField;

                  if (logo) {
                    addManyUserBusinessImages.fetch(
                      { images: [logo], routeName },
                      {
                        onAfterSuccess: ([logo]) => {
                          updateOneUserBusiness.fetch(
                            {
                              update: {
                                logo,
                              },
                              routeName,
                            },
                            {
                              onAfterSuccess: () => {
                                onClose();
                              },
                            },
                          );
                        },
                      },
                    );
                  }
                }}
                variant="primary"
                className="w-full"
              />,
            )}
          </form>
        );
      }}
    </Formik>
  );

  return (
    <Modal
      title="Logo"
      content={content}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitportal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
