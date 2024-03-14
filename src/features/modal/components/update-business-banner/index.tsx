import { useEffect, useMemo } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInputImages } from 'components/field-input-images';
import { Modal } from 'components/modal';

import { useAddManyUserBusinessImages } from 'features/api/useAddManyUserBusinessImages';
import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { Image, ImageFile } from 'types/general';
import { getImageEndpoint } from 'utils/api';

interface State {
  bannerImages: Array<ImageFile | Image>;
}

export interface UpdateBusinessBannerProps {
  routeName: string;
  callAfarResources?: CallAfarResources;
}

export const UpdateBusinessBanner = ({
  routeName,
  callAfarResources,
}: UpdateBusinessBannerProps) => {
  const { onClose } = useModal();
  const { getOneUserBusiness } = useGetOneUserBusiness();
  const { userPlan } = useGetUserPaymentPlan();

  const business = getOneUserBusiness.data;

  const { onCallAfar } = useCallFromAfar();

  useEffect(() => {
    getOneUserBusiness.fetch({ routeName });

    return () => onCallAfar(callAfarResources);
  }, []);

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
                  updateOneUserBusiness.status.isBusy || addManyUserBusinessImages.status.isBusy
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
      title="Banner"
      content={content}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitportal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
