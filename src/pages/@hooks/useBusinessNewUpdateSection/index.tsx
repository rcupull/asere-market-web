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

import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { useBusiness } from '../useBusiness';
import { PostsLayoutSectionPayload, useBusinessOwnerUpdate } from '../useBusinessOwnerUpdate';

import { Formik } from 'formik';
import { PostsLayoutSectionVisibility } from 'types/business';
import { getSectionFromBusiness } from 'utils/business';

type State = PostsLayoutSectionPayload;

export const useBusinessNewUpdateSection = () => {
  const { pushModal } = useModal();

  return {
    open: (args: { routeName: string; sectionId?: string }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { routeName, sectionId } = args;
            const { business, onFetch } = useBusiness();
            const { onClose } = useModal();

            const submitPortal = useSubmitPortal();

            const onAfterSuccess = () => {
              onFetch({ routeName });
              onClose();
            };

            const businessOwnerUpdate = useBusinessOwnerUpdate(business);

            const { section } =
              (sectionId && getSectionFromBusiness({ business, sectionId })) || {};

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
                        label="Mostrar grupo en"
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

                      {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                      <Divider />

                      <FieldInput
                        name="name"
                        label={
                          <div className="flex items-center">
                            <span>Nombre</span>
                            <FieldShowHide
                              name="hiddenName"
                              title={`${values.hiddenName ? 'Mostrar' : 'Ocultar'} el nombre del grupo.`}
                            />
                          </div>
                        }
                        className="w-full"
                      />

                      {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                      <Divider />

                      <FieldPostsSectionLayout name="type" label="Diseño" className="w-full" />

                      <Divider />

                      <FieldPostCategoriesButtons
                        label="Categorías"
                        name="postCategoriesTags"
                        routeName={routeName}
                      />

                      {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                      <Divider />

                      <FieldSearchLayout
                        name="searchLayout"
                        label="Diseño de búsqueda"
                        className="w-full"
                      />

                      {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                      <Divider />

                      <FieldPostCardLayout
                        label="Diseño de las tarjetas de publicaciones"
                        name="postCardLayout"
                        className="w-full"
                      />

                      {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                      <Divider />

                      {submitPortal.getPortal(
                        <ButtonSave
                          isBusy={businessOwnerUpdate.status.isBusy}
                          disabled={!isValid}
                          onClick={() =>
                            sectionId
                              ? businessOwnerUpdate.updatePostsLayoutSection(
                                  { value: values, sectionId },
                                  { onAfterSuccess },
                                )
                              : businessOwnerUpdate.addPostsLayoutSection(
                                  { value: values },
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

            return {
              title: 'Informaciones básicas de su negocio',
              content,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={submitPortal.ref} />,
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
