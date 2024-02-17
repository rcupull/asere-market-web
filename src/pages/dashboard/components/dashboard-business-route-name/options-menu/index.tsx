import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonRemove } from 'components/button-remove';
import { IconButton } from 'components/icon-button';
import { Menu } from 'components/menu';

import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useRemoveOneUserBusiness } from 'features/api/useRemoveOneUserBusiness';
import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';
import { useModal } from 'features/modal/useModal';

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
  const { getAllUserBussiness } = useGetAllUserBusiness();

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
                      hidden: !hidden,
                    },
                    {
                      onAfterSuccess: () => {
                        onRefresh();
                        getAllUserBussiness.fetch({}); // update all the bussiness
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
            content: 'Seguro que desea eliminar este negocio?',
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
                        getAllUserBussiness.fetch({}); // update all the bussiness
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
          label: hidden ? 'Mostrar' : 'Ocultar',
          onClick: handleShowHide,
          svg: hidden ? EyeIcon : EyeSlashIcon,
        },
        {
          label: 'Ver la pagina',
          onClick: ()=>pushRoute(`/${routeName}`),
          svg: ArrowTopRightOnSquareIcon,
        },
        {
          label: 'Eliminar',
          onClick: handleDelete,
          svg: TrashIcon,
        },
      ]}
    />
  );
};
