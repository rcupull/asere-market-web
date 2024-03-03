import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonRemove } from 'components/button-remove';
import { IconButton } from 'components/icon-button';
import { Menu } from 'components/menu';

import { useRemoveOneUserBusiness } from 'features/api/useRemoveOneUserBusiness';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { Business } from 'types/business';

export interface OptionsMenuProps {
  business: Business;
  onRefresh: () => void;
}

export const OptionsMenu = ({ business, onRefresh }: OptionsMenuProps) => {
  const { routeName, hidden } = business;

  const { pushModal } = useModal();
  const { pushRoute } = useRouter();
  const { onCallAfar } = useCallFromAfar();

  const handleShowHide = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { onClose } = useModal();
          const { updateOneUserBusiness } = useUpdateOneUserBusiness();

          return {
            className: 'max-w-lg',
            content: hidden
              ? 'Visualizar el negocio tambien mostrará todas las publicaciones qiue estaban visibles antes de ocultar el mismo. ¿Seguro que desea visualizar el negocio?'
              : 'Ocultar el negocio ocultará tambien todas las publicaciones del negocio. ¿Seguro que desea ocultar?',
            badge: <Badge variant="error" />,
            primaryBtn: (
              <Button
                label={hidden ? 'Mostrar' : 'Ocultar'}
                variant={hidden ? 'primary' : 'error'}
                onClick={() => {
                  updateOneUserBusiness.fetch(
                    {
                      routeName,
                      update: {
                        hidden: !hidden,
                      },
                    },
                    {
                      onAfterSuccess: () => {
                        onRefresh();
                        onCallAfar('getAllUserBussiness'); // update all the bussiness
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
  };

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { removeOneUserBusiness } = useRemoveOneUserBusiness();
          const { onClose } = useModal();

          return {
            content: (
              <div>
                <span>
                  Al eliminar este negocio seran borradas todas las imágenes y datos asociados al
                  mismo de manera <span className="font-bold">permanente</span>. Seguro que desea
                  eliminar este negocio?
                </span>
              </div>
            ),
            badge: <Badge variant="error" />,
            primaryBtn: (
              <ButtonRemove
                isBusy={removeOneUserBusiness.status.isBusy}
                onClick={() =>
                  removeOneUserBusiness.fetch(
                    { routeName },
                    {
                      onAfterSuccess: () => {
                        onRefresh();

                        onCallAfar('getAllUserBussiness'); // update all the bussiness
                        pushRoute('/dashboard/business');
                        onClose();
                      },
                    },
                  )
                }
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  return (
    <Menu
      buttonElement={<IconButton svg={Bars3Icon} />}
      items={[
        {
          label: `${hidden ? 'Mostrar' : 'Ocultar'} este negocio`,
          onClick: handleShowHide,
          svg: hidden ? EyeIcon : EyeSlashIcon,
        },
        {
          label: 'Editar el negocio',
          onClick: () => {
            pushModal('BusinessNew', {
              routeName,
              callAfarResources: [
                'getAllUserBussiness',
                'redirect_to_dashboard_business_routename',
              ],
            });
          },
          svg: PencilSquareIcon,
        },
        {
          label: 'Ver la página de este negocio',
          onClick: () => pushRoute(`/${routeName}`),
          svg: ArrowTopRightOnSquareIcon,
        },
        {
          label: 'Eliminar el negocio',
          onClick: handleDelete,
          svg: TrashIcon,
        },
      ]}
    />
  );
};
