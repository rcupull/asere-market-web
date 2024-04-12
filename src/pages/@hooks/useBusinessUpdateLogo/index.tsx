import { useMemo } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInputImages } from 'components/field-input-images';

import { useAddManyUserBusinessImages } from 'features/api/useAddManyUserBusinessImages';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';
import { useModal } from 'features/modal/useModal';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { Business } from 'types/business';
import { Image, ImageFile } from 'types/general';
import { getImageEndpoint } from 'utils/api';

interface State {
  logoField: Array<ImageFile | Image | undefined>;
}

export const useBusinessUpdateLogo = () => {
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
                            updateOneUserBusiness.status.isBusy ||
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
                                    updateOneUserBusiness.fetch(
                                      {
                                        update: {
                                          logo,
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
