import { useState } from 'react';

import { Button } from 'components/button';
import { FieldInputImages } from 'components/field-input-images';

import { useAddManyUserBusinessImages } from 'features/api/useAddManyUserBusinessImages';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { TopActions } from '../../@common/top-actions';

import { Formik } from 'formik';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { Business } from 'types/business';
import { Image } from 'types/general';
import { getImageEndpoint } from 'utils/api';

export interface LogoProps {
  business: Business;
}

export const Logo = ({ business }: LogoProps) => {
  const { routeName, logo } = business;

  const { getPortal, ref } = useSubmitPortal();
  const { updateOneUserBusiness } = useUpdateOneUserBusiness();
  const { addManyUserBusinessImages } = useAddManyUserBusinessImages();

  const [initialValues, setInitialValues] = useState<{
    logoField: Array<File | Image | undefined>;
  }>({
    logoField: [logo],
  });

  return (
    <LayoutPageSection title="Logo">
      <Formik<{
        logoField: Array<File | Image | undefined>;
      }>
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize
      >
        {({ values, isValid }) => {
          return (
            <form>
              <FieldInputImages
                id="logoField"
                name="logoField"
                className="mt-6"
                getImageSrc={getImageEndpoint}
              />

              {getPortal(
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
                                  setInitialValues({
                                    logoField: [logo],
                                  });
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
      <TopActions>
        <div className="ml-auto" ref={ref} />
      </TopActions>
    </LayoutPageSection>
  );
};
