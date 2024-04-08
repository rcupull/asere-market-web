import { IconButtonUpdate } from 'components/icon-button-update';
import { UserAvatar } from 'components/user-avatar';

import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { callAfarIds } from 'hooks/useCallFromAfar';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SideBarUserHeaderProps extends StyleProps {}

export const SideBarUserHeader = ({ className }: SideBarUserHeaderProps) => {
  const { pushModal } = useModal();
  const { authData } = useAuth();

  const { name, _id: userId } = authData?.user || {};

  return (
    <div className={cn('flex flex-col items-center mb-2', className)}>
      <div className="relative">
        <UserAvatar className="mt-4 !h-14 !w-14" />
        <div className="absolute -bottom-3 -right-3 flex items-center justify-center rounded-full ring-2 ring-gray-900">
          <IconButtonUpdate
            className="!h-7 !w-7 !p-0.5"
            title="Editar perfil"
            onClick={() =>
              userId &&
              pushModal('ProfileUpdate', {
                userId,
                callAfarResources: callAfarIds.refresh_auth_user,
              })
            }
          />
        </div>
      </div>
      <span className="mt-4 text-sm border px-2 py-1 rounded-2xl">{name}</span>
    </div>
  );
};
