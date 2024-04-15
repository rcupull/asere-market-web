import { useMemo } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInputImages } from 'components/field-input-images';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useAddManyImages } from 'features/api/images/useAddManyImages';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
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
            const { updateOneBusiness } = useUpdateOneBusiness();
            const { addManyImages } = useAddManyImages();

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
                          isBusy={updateOneBusiness.status.isBusy || addManyImages.status.isBusy}
                          disabled={!isValid || initialValues.bannerImages === values.bannerImages}
                          onClick={() => {
                            if (!business) return;

                            const { bannerImages } = values;

                            if (bannerImages.length) {
                              addManyImages.fetch(
                                { images: bannerImages, routeName, userId: business.createdBy },
                                {
                                  onAfterSuccess: (bannerImages) => {
                                    updateOneBusiness.fetch(
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
