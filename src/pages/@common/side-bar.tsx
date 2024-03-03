import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  BookmarkIcon,
  BuildingLibraryIcon,
  CodeBracketIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon,
  PlusCircleIcon,
  UserCircleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

import { IconButtonUpdate } from 'components/icon-button-update';
import { ProLink } from 'components/pro-link';
import { SideBar as SideBarBase } from 'components/side-bar';
import { UserAvatar } from 'components/user-avatar';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useAuthSignOut } from 'features/api/useAuthSignOut';
import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';

export interface SideBarProps extends StyleProps {}

export const SideBar = ({ className }: SideBarProps) => {
  const { getAllUserBussiness } = useGetAllUserBusiness();
  const { pushModal } = useModal();
  const { pushRoute, isBusinessPage, params } = useRouter();
  const { routeName } = params;
  const { isAdmin, isAuthenticated, authData } = useAuthSignIn();

  const { name, _id: userId } = authData?.user || {};
  const { authSignOut } = useAuthSignOut();
  const business = getAllUserBussiness.data || [];

  useCallFromAfar('side_bar_redirect_to_last_created_business', (newBussiness: Business) => {
    const { routeName } = newBussiness;
    pushRoute(`/dashboard/business/${routeName}`, {}, { timeout: 100 });
  });

  const { isNotValidBussinessCountByUser } = useGetUserPaymentPlan();

  const needPremium = isNotValidBussinessCountByUser(getAllUserBussiness.data?.length);

  const addNewBusinessButton = (
    <PlusCircleIcon
      title="Agragar nuevo negocio"
      className="ml-auto h-6 hover:text-gray-50 rounded-full"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        pushModal('BusinessNew', {
          callAfarResources: ['side_bar_redirect_to_last_created_business', 'getAllUserBussiness'],
        });
      }}
    />
  );

  return (
    <SideBarBase
      className={className}
      items={[
        isAuthenticated && {
          content: (
            <div className="flex flex-col items-center mb-2">
              <div className="relative">
                <UserAvatar className="mt-4 !h-14 !w-14" />
                <IconButtonUpdate
                  className="!absolute -bottom-3 -right-3 !p-1 h-7 w-7"
                  title="Editar perfil"
                  onClick={() =>
                    userId &&
                    pushModal('ProfileUpdate', { userId, callAfarResources: 'refresh_auth_user' })
                  }
                />
              </div>
              <span className="mt-4 text-sm border px-2 py-1 rounded-2xl">{name}</span>
            </div>
          ),
        },
        isAuthenticated && {
          divider: true,
        },
        isBusinessPage && { label: 'Publicaciones', href: `/${routeName}`, svg: HomeIcon },
        !isBusinessPage && { label: 'Inicio', href: '/', svg: HomeIcon, className: 'sm:hidden' },
        !isBusinessPage && {
          label: 'Todas las tiendas',
          href: '/business',
          svg: BuildingLibraryIcon,
          className: 'sm:hidden',
        },
        !isBusinessPage && {
          label: 'Precios',
          href: '/payment-plans',
          svg: CurrencyDollarIcon,
          className: 'sm:hidden',
        },
        !isBusinessPage && {
          label: '¿Que es Hook?',
          href: '/about-us',
          svg: UserCircleIcon,
          className: 'sm:hidden',
        },
        isAdmin && { label: 'Admin', href: '/admin', svg: CodeBracketIcon, className: 'sm:hidden' },
        {
          divider: true,
          className: 'sm:hidden',
        },
        isAuthenticated && {
          label: 'Mis negocios',
          href: '/dashboard/business',
          svg: BookmarkIcon,
          endElement: needPremium ? <ProLink className="ml-auto h-6" /> : addNewBusinessButton,
        },
        ...business.map(({ name, routeName, hidden }) => {
          const Svg = hidden ? EyeSlashIcon : EyeIcon;

          return (
            isAuthenticated && {
              label: name,
              href: `/dashboard/business/${routeName}`,
              endElement: <Svg className="h-4 ml-auto" />,
              className: 'pl-10',
            }
          );
        }),
        isAuthenticated && {
          divider: true,
          className: 'sm:hidden',
        },
        isAuthenticated && {
          label: 'Settings',
          href: '/settings',
          svg: Cog8ToothIcon,
          className: 'sm:hidden',
        },
        isAuthenticated && {
          label: 'Cerrar sesión',
          svg: ArrowRightStartOnRectangleIcon,
          onClick: () => authSignOut.fetch(undefined),
          className: 'sm:hidden',
        },
        !isAuthenticated && {
          label: 'Créate una cuenta',
          svg: UserPlusIcon,
          href: '/sign-up',
          className: 'sm:hidden',
        },
        !isAuthenticated && {
          label: 'Iniciar sesión',
          svg: ArrowRightEndOnRectangleIcon,
          href: '/sign-in',
          className: 'sm:hidden',
        },
      ]}
    />
  );
};
