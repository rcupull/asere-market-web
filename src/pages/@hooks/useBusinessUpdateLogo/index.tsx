import { useMemo } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInputImages } from 'components/field-input-images';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useAddManyUserBusinessImages } from 'features/api/useAddManyUserBusinessImages';
import { useModal } from 'features/modal/useModal';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { useBusinessOwnerData } from '../useBusinessOwnerData';

import { Formik } from 'formik';
import { Image, ImageFile } from 'types/general';
import { getImageEndpoint } from 'utils/api';

interface State {
  logoField: Array<ImageFile | Image | undefined>;
}

export const useBusinessUpdateLogo = () => {
  const { pushModal } = useModal();

  return {
    open: (args: { routeName: string }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { routeName } = args;
            const { business, onFetch } = useBusinessOwnerData();

            const { onClose } = useModal();

            const { logo } = business || {};

            const submitportal = useSubmitPortal();
            const { updateOneBusiness } = useUpdateOneBusiness();
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
                            updateOneBusiness.status.isBusy ||
                            addManyUserBusinessImages.status.isBusy
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
                                    updateOneBusiness.fetch(
                                      {
                                        update: {
                                          logo,
                                        },
                                        routeName,
                                      },
                                      {
                                        onAfterSuccess: () => {
                                          onFetch({ routeName });
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

            return {
              title: 'Logo',
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
