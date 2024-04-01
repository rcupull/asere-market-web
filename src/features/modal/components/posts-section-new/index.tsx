import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { ButtonSave } from 'components/button-save';
import { Divider } from 'components/divider';
import { FieldInput } from 'components/field-input';
import { FieldPostCardLayout } from 'components/field-post-card-layout';
import { FieldPostCategoriesButtons } from 'components/field-post-categories-buttons';
import { FieldPostsSectionLayout } from 'components/field-posts-section-layout';
import { FieldSearchLayout } from 'components/field-search-layout';
import { FieldSelect } from 'components/field-select';
import { FieldShowHide } from 'components/field-show-hide';
import { Modal } from 'components/modal';

import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';
import {
  PostsLayoutSectionPayload,
  useBusinessOwnerUpdate,
} from 'pages/@hooks/useBusinessOwnerUpdate';
import { PostsLayoutSectionVisibility } from 'types/business';

type State = PostsLayoutSectionPayload;

export interface PostsSectionNewProps {
  routeName: string;
  sectionId?: string; //only user to update a post
  callAfarResources?: CallAfarResources;
}

export const PostsSectionNew = ({
  routeName,
  sectionId,
  callAfarResources,
}: PostsSectionNewProps) => {
  const submitPortal = useSubmitPortal();

  const { onClose } = useModal();

  const { onCallAfar } = useCallFromAfar();
  const onRefresh = () => onCallAfar(callAfarResources);

  const onAfterSuccess = () => {
    onRefresh();
    onClose();
  };

  const businessOwnerData = useBusinessOwnerData();
  const businessOwnerUpdate = useBusinessOwnerUpdate();

  useEffect(() => {
    businessOwnerData.onFetch({ routeName });
  }, []);

  const section = sectionId && businessOwnerData.onGetPostsLayoutSection({ sectionId })?.section;

  const getFormErrors = useGetFormErrors();

  const content = (
    <Formik<State>
      initialValues={{
        name: '',
        postCardLayout: undefined,
        postCategoriesTags: [],
        searchLayout: undefined,
        type: 'grid',
        showIn: [],
        ...(section || {}),
      }}
      enableReinitialize
      onSubmit={() => {}}
      validate={(values) => {
        return getFormErrors(values, [
          {
            field: 'name',
            type: 'required',
          },
        ]);
      }}
    >
      {({ values, isValid }) => {
        return (
          <form>
            <FieldSelect<{ value: PostsLayoutSectionVisibility }>
              label="Mostrar sección en"
              renderOption={({ value }) => value}
              renderValue={({ value }) => (
                <div className="rounded-2xl px-2 border border-gray-400">{value}</div>
              )}
              optionToValue={({ value }) => value}
              items={[
                {
                  value: 'businessPage',
                },
                {
                  value: 'postPage',
                },
              ]}
              multi
              name="showIn"
              className="w-full"
            />

            <Divider />

            <FieldInput
              name="name"
              label={
                <div className="flex items-center">
                  <span>Nombre</span>
                  <FieldShowHide
                    name="hiddenName"
                    title={`${values.hiddenName ? 'Mostrar' : 'Ocultar'} el nombre de la sección en la página del negocio`}
                  />
                </div>
              }
              className="w-full"
            />

            <Divider />

            <FieldPostsSectionLayout name="type" label="Diseño de la sección" className="w-full" />

            <Divider />

            <FieldPostCategoriesButtons
              label="Categorías"
              name="postCategoriesTags"
              routeName={routeName}
            />

            <Divider />

            <FieldSearchLayout name="searchLayout" label="Diseño de búsqueda" className="w-full" />

            <Divider />

            <FieldPostCardLayout
              label="Tarjeta de publicación"
              name="postCardLayout"
              className="w-full"
            />

            {submitPortal.getPortal(
              <ButtonSave
                isBusy={businessOwnerUpdate.status.isBusy}
                disabled={!isValid}
                onClick={() =>
                  sectionId
                    ? businessOwnerUpdate.updatePostsLayoutSection(
                        { routeName, value: values, sectionId },
                        { onAfterSuccess },
                      )
                    : businessOwnerUpdate.addPostsLayoutSection(
                        { routeName, value: values },
                        { onAfterSuccess },
                      )
                }
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
      title={sectionId ? 'Editar sección' : 'Nueva sección'}
      content={<div className="h-[calc(100vh-12rem)] overflow-auto">{content}</div>}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
