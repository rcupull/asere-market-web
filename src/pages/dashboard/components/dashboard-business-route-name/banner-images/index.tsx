import { Button } from 'components/button';
import { FieldInputImages } from 'components/field-input-images';

import { useAddManyUserBusinessImages } from 'features/api/useAddManyUserBusinessImages';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { Business } from 'types/business';
import { Image } from 'types/general';
import { getImageEndpoint } from 'utils/api';

export interface BannerImagesProps {
  business: Business;
}

export const BannerImages = ({ business }: BannerImagesProps) => {
  const { routeName, bannerImages } = business;

  const { getPortal, ref } = useSubmitPortal();
  const { updateOneUserBusiness } = useUpdateOneUserBusiness();
  const { userPlan } = useGetUserPaymentPlan();
  const { addManyUserBusinessImages } = useAddManyUserBusinessImages();

  return (
    <div>
      <Formik<{
        bannerImages: Array<File | Image>;
      }>
        initialValues={{
          bannerImages: bannerImages || [],
        }}
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
              />

              {getPortal(
                <Button
                  label="Guardar"
                  isBusy={updateOneUserBusiness.status.isBusy}
                  disabled={!isValid}
                  onClick={() => {
                    const { bannerImages } = values;

                    if (bannerImages.length) {
                      addManyUserBusinessImages.fetch(
                        { images: bannerImages, routeName },
                        {
                          onAfterSuccess: (bannerImages) => {
                            updateOneUserBusiness.fetch({
                              bannerImages,
                              routeName,
                            });
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

      <div ref={ref} />
    </div>
  );
};
