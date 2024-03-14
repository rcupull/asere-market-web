import { useEffect, useMemo } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { FieldInput } from 'components/field-input';
import { Modal } from 'components/modal';

import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';

interface State {
  face: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

export interface UpdateSocialNetworksProps {
  routeName: string;
  callAfarResources?: CallAfarResources;
}

export const UpdateSocialNetworks = ({
  routeName,
  callAfarResources,
}: UpdateSocialNetworksProps) => {
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

  const initialValues = useMemo<State>(
    () => ({
      face: business?.socialLinks?.face || '',
      instagram: business?.socialLinks?.instagram || '',
      twitter: business?.socialLinks?.twitter || '',
      linkedin: business?.socialLinks?.linkedin || '',
      youtube: business?.socialLinks?.youtube || '',
    }),
    [business],
  );

  const renderFieldLink = (field: React.ReactNode, href: string) => {
    return (
      <div className="flex items-center mt-2 w-full">
        {field}
        <a href={href} className="text-nowrap ml-2 hyperlink mt-8" target="_blank" rel="noreferrer">
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

            {/* {renderFieldLink(
              <FieldInput label="Youtube" name="youtube" className="w-full" />,
              values.youtube,
            )} */}

            {submitportal.getPortal(
              <Button
                label="Guardar"
                isBusy={updateOneUserBusiness.status.isBusy}
                disabled={!isValid}
                onClick={() => {
                  const { face, instagram, twitter, linkedin, youtube } = values;

                  updateOneUserBusiness.fetch(
                    {
                      update: {
                        socialLinks: {
                          face,
                          instagram,
                          twitter,
                          linkedin,
                          youtube,
                        },
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
  );

  return (
    <Modal
      title="Redes sociales"
      content={content}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitportal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
