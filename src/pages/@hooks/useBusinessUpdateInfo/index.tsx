import { useMemo } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInput } from 'components/field-input';
import { FieldSelect } from 'components/field-select';

import { useUpdateOneBusiness } from 'features/api/business/useUpdateOneBusiness';
import { useModal } from 'features/modal/useModal';

import { FetchOptions } from 'hooks/useFetch';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { useBusiness } from '../useBusiness';

import { Formik } from 'formik';
import { BusinessSalesStrategy } from 'types/business';

interface State {
  face: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  whatsAppPhoneNumber: string;
  salesStrategy: BusinessSalesStrategy;
}

export const useBusinessUpdateInfo = () => {
  const { pushModal } = useModal();

  return {
    open: (args: { routeName: string;  }, options?: FetchOptions) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { routeName } = args;

            const { business } = useBusiness();
            const { onClose } = useModal();

            const submitportal = useSubmitPortal();
            const { updateOneBusiness } = useUpdateOneBusiness();

            const initialValues = useMemo<State>(
              () => ({
                face: business?.socialLinks?.face || '',
                instagram: business?.socialLinks?.instagram || '',
                twitter: business?.socialLinks?.twitter || '',
                linkedin: business?.socialLinks?.linkedin || '',
                youtube: business?.socialLinks?.youtube || '',
                whatsAppPhoneNumber: business?.whatsAppPhoneNumber || '',
                salesStrategy: business?.salesStrategy || 'none',
              }),
              [business],
            );

            const renderFieldLink = (field: React.ReactNode, href: string) => {
              return (
                <div className="flex items-center mt-2 w-full">
                  {field}
                  <a
                    href={href}
                    className="text-nowrap ml-2 hyperlink mt-8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ir al link
                  </a>
                </div>
              );
            };

            const content = (
              <Formik<State> initialValues={initialValues} enableReinitialize onSubmit={() => {}}>
                {({ values, isValid }) => {
                  return (
                    <form className="w-full">
                      <FieldInput label="Teléfono" name="whatsAppPhoneNumber" className="w-full" />

                      {renderFieldLink(
                        <FieldInput label="Facebook" name="face" className="w-full" />,
                        values.face,
                      )}
                      {renderFieldLink(
                        <FieldInput label="Instagram" name="instagram" className="w-full" />,
                        values.instagram,
                      )}
                      {renderFieldLink(
                        <FieldInput label="Twitter" name="twitter" className="w-full" />,
                        values.twitter,
                      )}
                      {renderFieldLink(
                        <FieldInput label="Linkedin" name="linkedin" className="w-full" />,
                        values.linkedin,
                      )}

                      <FieldSelect<{ value: BusinessSalesStrategy }>
                        label="Estratégia de venta"
                        renderOption={({ value }) => value}
                        renderValue={({ value }) => value}
                        optionToValue={({ value }) => value}
                        items={[
                          {
                            value: 'none',
                          },
                          {
                            value: 'whatsAppWithOwner_pickUpProduct',
                          },
                          {
                            value: 'addToCart_whatsAppWithOwner_pickUpProduct',
                          },
                        ]}
                        name="salesStrategy"
                        className="w-full"
                      />

                      {submitportal.getPortal(
                        <Button
                          label="Guardar"
                          isBusy={updateOneBusiness.status.isBusy}
                          disabled={!isValid}
                          onClick={() => {
                            const {
                              face,
                              instagram,
                              twitter,
                              linkedin,
                              youtube,
                              whatsAppPhoneNumber,
                              salesStrategy,
                            } = values;

                            updateOneBusiness.fetch(
                              {
                                update: {
                                  whatsAppPhoneNumber,
                                  socialLinks: {
                                    face,
                                    instagram,
                                    twitter,
                                    linkedin,
                                    youtube,
                                  },
                                  salesStrategy,
                                },
                                routeName,
                              },
                              {
                                onAfterSuccess: () => {
                                  options?.onAfterSuccess?.({});
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
            );

            return {
              title: 'Informaciones básicas de su negocio',
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
