import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { ButtonRemove } from 'components/button-remove';
import { FieldInput } from 'components/field-input';
import { IconButtonRemove } from 'components/icon-button-remove ';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useAddBusinessPostCategory } from 'features/api/useAddBusinessPostCategory';
import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useRemoveBusinessPostCategory } from 'features/api/useRemoveBusinessPostCategory';
import { useUpdateBusinessPostCategory } from 'features/api/useUpdateBusinessPostCategory';
import { useModal } from 'features/modal/useModal';

import { useGetFormErrors } from 'hooks/useGetFormErrors';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { Formik } from 'formik';
import { getPostCategoryTag } from 'utils/business';
import { cn } from 'utils/general';

export const useBusinessUpdatePostCategories = () => {
  const { pushModal } = useModal();

  return {
    open: (args: { routeName: string; onRefresh: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { routeName, onRefresh } = args;

            const { getOneUserBusiness } = useGetOneUserBusiness();
            const localFetch = () => getOneUserBusiness.fetch({ routeName });

            useEffect(() => {
              localFetch();
              return () => onRefresh();
            }, []);

            const business = getOneUserBusiness.data;

            const submitPortal = useSubmitPortal();

            const { getPortal, ref } = useSubmitPortal();
            const { addBusinessPostCategory } = useAddBusinessPostCategory();
            const { pushModal } = useModal();

            const getFormErrors = useGetFormErrors();

            const { postCategories = [] } = business || {};

            const content = (
              <>
                <div className="flex">
                  <Formik
                    initialValues={{
                      label: '',
                    }}
                    validate={(values) => {
                      return getFormErrors(values, [
                        {
                          field: 'label',
                          type: 'required',
                        },
                        {
                          field: 'label',
                          type: 'custom',
                          message: 'Esa categoría ya existe.',
                          customCb: (label) =>
                            !postCategories.map(({ label }) => label).includes(label),
                        },
                      ]);
                    }}
                    onSubmit={() => {}}
                  >
                    {({ values, isValid, resetForm }) => {
                      return (
                        <form className="w-full">
                          <FieldInput
                            id="postCategoryLabel"
                            name="label"
                            placeholder='Escriba una nueva categoría, ej. "Productos en oferta", "Recientes", etc"'
                          />

                          {getPortal(
                            <Button
                              label="Agregar categoría"
                              isBusy={addBusinessPostCategory.status.isBusy}
                              disabled={!isValid}
                              onClick={() => {
                                const { label } = values;

                                if (!label) return;

                                addBusinessPostCategory.fetch(
                                  { routeName, label, tag: getPostCategoryTag(label) },
                                  {
                                    onAfterSuccess: () => {
                                      resetForm();
                                      localFetch();
                                    },
                                  },
                                );
                              }}
                              variant="primary"
                              className="ml-4"
                            />,
                          )}
                        </form>
                      );
                    }}
                  </Formik>
                  <div className="ml-auto" ref={ref} />
                </div>

                {getOneUserBusiness.status.isBusy ? (
                  <div className="flex w-full justify-center">
                    <SpinnerEllipsis />
                  </div>
                ) : (
                  <div className="flex flex-wrap mt-3 gap-3 border border-gray-300 rounded-md p-3 ">
                    {postCategories.map(({ label, hidden, tag }, index) => {
                      return (
                        <div
                          key={index}
                          className={cn(
                            'flex items-center gap-2 border border-gray-400 rounded-md p-2',
                            {
                              'bg-gray-200': hidden,
                            },
                          )}
                        >
                          {label}
                          <IconButtonRemove
                            className="text-gray-600 hover:text-gray-800 cursor-pointer"
                            onClick={() => {
                              pushModal(
                                'Confirmation',
                                {
                                  useProps: () => {
                                    const { onClose } = useModal();
                                    const { removeBusinessPostCategory } =
                                      useRemoveBusinessPostCategory();

                                    return {
                                      content: (
                                        <div>
                                          Al eliminar una categoría estará removiendo esta
                                          clasificación de todas las publicaciones de su negocio y
                                          es un cambio irreversible. Seguro que desea eliminar la
                                          categoría <span className="font-bold">{label}</span>?
                                        </div>
                                      ),
                                      badge: <Badge variant="error" />,
                                      primaryBtn: (
                                        <ButtonRemove
                                          label="Eliminar"
                                          isBusy={removeBusinessPostCategory.status.isBusy}
                                          onClick={() => {
                                            removeBusinessPostCategory.fetch(
                                              {
                                                routeName,
                                                tag,
                                              },
                                              {
                                                onAfterSuccess: () => {
                                                  localFetch();
                                                  onClose();
                                                },
                                              },
                                            );
                                          }}
                                        />
                                      ),
                                    };
                                  },
                                },
                                { emergent: true },
                              );
                            }}
                          />

                          <IconButtonShowHide
                            hidden={hidden}
                            onClick={() => {
                              pushModal(
                                'Confirmation',
                                {
                                  useProps: () => {
                                    const { onClose } = useModal();
                                    const { removeBusinessPostCategory } =
                                      useRemoveBusinessPostCategory();
                                    const { updateBusinessPostCategory } =
                                      useUpdateBusinessPostCategory();

                                    return {
                                      title: `${hidden ? 'Mostrar' : 'Ocultar'} categoría`,
                                      content: (
                                        <>
                                          {hidden ? (
                                            <div>
                                              Usted está mostrando esta categoría y podrá ser usada
                                              para filtrar sus publicaciones en la página de su
                                              negocio. Desea continuar?
                                            </div>
                                          ) : (
                                            <div>
                                              Usted está ocultando esta categoría y no será visible
                                              en el filtro por categorias en la página de su
                                              negocio. Desea continuar?
                                            </div>
                                          )}
                                        </>
                                      ),
                                      badge: <Badge variant="info" />,
                                      primaryBtn: (
                                        <Button
                                          label="Continuar"
                                          isBusy={removeBusinessPostCategory.status.isBusy}
                                          onClick={() => {
                                            updateBusinessPostCategory.fetch(
                                              {
                                                routeName,
                                                tag,
                                                update: {
                                                  hidden: !hidden,
                                                },
                                              },
                                              {
                                                onAfterSuccess: () => {
                                                  localFetch();
                                                  onClose();
                                                },
                                              },
                                            );
                                          }}
                                        />
                                      ),
                                    };
                                  },
                                },
                                { emergent: true },
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            );

            return {
              title: 'Categorías',
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
