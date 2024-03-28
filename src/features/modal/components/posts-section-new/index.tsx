import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { ButtonSave } from 'components/button-save';
import { Divider } from 'components/divider';
import { FieldInput } from 'components/field-input';
import { FieldSelect } from 'components/field-select';
import { FieldToggleButton } from 'components/field-toggle-button';
import { Modal } from 'components/modal';

import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { FieldLayoutPostCard } from './layout-post-card';

import { Formik } from 'formik';
import { FieldPostCategoriesButtons } from 'pages/@common/filters/field-post-categories-buttons';
import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';
import {
  PostsLayoutSectionPayload,
  useBusinessOwnerUpdate,
} from 'pages/@hooks/useBusinessOwnerUpdate';
import { SearchLayoutType } from 'types/business';

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
    businessOwnerData.onRefresh({ routeName });
  }, []);

  const section =
    (sectionId && businessOwnerData.onGetPostsLayoutSection({ sectionId })?.section) || {};

  const content = (
    <Formik<State>
      initialValues={{
        name: '',
        postCardLayout: undefined,
        postCategories: [],
        searchLayout: undefined,
        ...section,
      }}
      enableReinitialize
      onSubmit={() => {}}
    >
      {({ values, isValid }) => {
        return (
          <form>
            <div className="flex justify-between">
              <FieldInput name="name" label="Nombre de la sección" className="w-full" />
              <FieldToggleButton name="showName" className="ml-10" />
            </div>

            <Divider />

            <div className="flex items-center justify-between mt-6">
              <FieldPostCategoriesButtons
                label="Categorías"
                name="postCategories"
                routeName={routeName}
              />
              <FieldToggleButton name="showCategories" className="ml-10" />
            </div>

            <Divider />

            <div className="flex items-center justify-between mt-6">
              <FieldSelect<{ searchLayout: SearchLayoutType }>
                items={[
                  {
                    searchLayout: 'none',
                  },
                  {
                    searchLayout: 'left',
                  },
                  {
                    searchLayout: 'center',
                  },
                  {
                    searchLayout: 'right',
                  },
                  {
                    searchLayout: 'postCategories',
                  },
                  {
                    searchLayout: 'postCategoriesScrollable',
                  },
                  {
                    searchLayout: 'postCategoriesExcluded',
                  },
                  {
                    searchLayout: 'postCategoriesExcludedScrollable',
                  },
                ]}
                renderOption={({ searchLayout }) => searchLayout}
                renderValue={({ searchLayout }) => searchLayout}
                optionToValue={({ searchLayout }) => searchLayout}
                name="searchLayout"
                label="Diseño de búsqueda"
                className="w-full"
              />
              <FieldToggleButton name="showSearch" className="ml-10" />
            </div>

            <Divider />

            <FieldLayoutPostCard
              label="Tarjeta de publicación"
              name="postCardLayout"
              className="mt-6 w-[50rem]"
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
