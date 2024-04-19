import { BreadCrumble } from 'components/bread-crumble';

import { useRouter } from 'hooks/useRouter';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useShoppingIdPersistent } from 'pages/@hooks/useShoppingIdPersistent';
import { StyleProps } from 'types/general';
import { getBusinessRoute, getDashboardRoute, getOneShoppingRoute, getShoppingRoute } from 'utils/business';

export interface AppBreadCrumbleProps extends StyleProps {

}

export const AppBreadCrumble = ({className}:AppBreadCrumbleProps): JSX.Element => {
  const { business } = useBusiness();
  const { isShoppingPage, isDashboardPage } = useRouter();
  const shoppingIdPersistent = useShoppingIdPersistent();

  return (
    <BreadCrumble
      items={[
        {
          label: 'Inicio',
          route: '/',
        },
        isDashboardPage && {
          label: 'Dashboard',
          route: getDashboardRoute(),
        },
        business && {
          label: business.name,
          route: getBusinessRoute({ routeName: business.routeName }),
        },
        business && isShoppingPage &&{
          label: 'Compras',
          route: getShoppingRoute({ routeName: business.routeName }),
        },
        business && isShoppingPage && shoppingIdPersistent.data &&{
          label: shoppingIdPersistent.data._id,
          route: getOneShoppingRoute({ routeName: business.routeName, shoppingId: shoppingIdPersistent.data._id }),
        },
      ]}
      className={className}
    />
  );
};
