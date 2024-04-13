import { useMemo } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInputImages } from 'components/field-input-images';

import { useAddManyUserBusinessImages } from 'features/api/useAddManyUserBusinessImages';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';
import { useModal } from 'features/modal/useModal';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { useBusinessOwnerData } from '../useBusinessOwnerData';

import { Formik } from 'formik';
import { Image, ImageFile } from 'types/general';
import { getImageEndpoint } from 'utils/api';

interface State {
  bannerImages: Array<ImageFile | Image>;
}

export const useBusinessUpdateBanner = () => {
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
            const { userPlan } = useGetUserPaymentPlan();

            const { bannerImages } = business || {};

            const submitportal = useSubmitPortal();
            const { updateOneUserBusiness } = useUpdateOneUserBusiness();
            const { addManyUserBusinessImages } = useAddManyUserBusinessImages();

            const initialValues = useMemo<State>(
              () => ({
                bannerImages: bannerImages || [],
              }),
              [bannerImages],
            );

            const content = (
              <Formik<{
                bannerImages: Array<ImageFile | Image>;
              }>
                initialValues={initialValues}
                onSubmit={() => {}}
                enableReinitialize
              >
                {({ values, isValid }) => {
                  return (
                    <form>
                      <FieldInputImages
                        id="bannerImages"
                        name="bannerImages"
                        className="mt-6"
                        getImageSrc={getImageEndpoint}
                        multi
                        max={userPlan?.maxImagesByBusinessBanner}
                        enabledImageHref
                      />

                      {submitportal.getPortal(
                        <Button
                          label="Guardar"
                          isBusy={
                            updateOneUserBusiness.status.isBusy ||
                            addManyUserBusinessImages.status.isBusy
                          }
                          disabled={!isValid || initialValues.bannerImages === values.bannerImages}
                          onClick={() => {
                            const { bannerImages } = values;

                            if (bannerImages.length) {
                              addManyUserBusinessImages.fetch(
                                { images: bannerImages, routeName },
                                {
                                  onAfterSuccess: (bannerImages) => {
                                    updateOneUserBusiness.fetch(
                                      {
                                        update: {
                                          bannerImages,
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
              title: 'Banner',
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
