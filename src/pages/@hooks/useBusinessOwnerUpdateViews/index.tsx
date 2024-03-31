import { Badge } from 'components/badge';
import { ButtonSave } from 'components/button-save';

import { useModal } from 'features/modal/useModal';

import { FetchOptions } from 'hooks/useFetch';

import { useBusinessOwnerUpdate } from '../useBusinessOwnerUpdate';

import { PostsLayoutSection } from 'types/business';

export const useBusinessOwnerUpdateViews = (): {
  showHidePostsSection: (
    args: { section: PostsLayoutSection; hidden: boolean; routeName: string },
    options?: FetchOptions,
  ) => void;
} => {
  const { pushModal } = useModal();

  return {
    showHidePostsSection: ({ hidden, section, routeName }, options) => {
      pushModal(
        'Confirmation',
        {
          useProps: () => {
            const businessOwnerUpdate = useBusinessOwnerUpdate();
            const { onClose } = useModal();
            return {
              content: (
                <div>
                  <span>
                    Al <span className="font-bold">{`${hidden ? 'ocultar' : 'mostrar'}`}</span> esta
                    sección {`${hidden ? 'no' : ''}`} será visible para los usuario en la página de
                    su negocio. Las publicaciones, configuraciones y demás no sufrirán ningun
                    cambio. Seguro que desea {`${hidden ? 'ocultar' : 'mostrar'} `}
                    esta sección?
                  </span>
                </div>
              ),
              badge: <Badge variant="error" />,
              primaryBtn: (
                <ButtonSave
                  label={hidden ? 'Ocultar' : 'Mostrar'}
                  isBusy={businessOwnerUpdate.status.isBusy}
                  onClick={() => {
                    businessOwnerUpdate.updatePostsLayoutSection(
                      { routeName, sectionId: section._id, value: { hidden } },
                      {
                        ...options,
                        onAfterSuccess: (response) => {
                          onClose();
                          options?.onAfterSuccess?.(response);
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
    },
  };
};
