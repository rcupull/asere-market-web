// import { BellIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { MainIcon } from 'components/main-icon';

import { useRouter } from 'hooks/useRouter';

import { Nullable } from 'types/general';
import { cn, compact } from 'utils/general';

interface Item {
  name: string;
  href: string;
}
export interface Props {
  items: Array<Nullable<Item>>;
  userMenu?: React.ReactNode;
}

export const NavBar = ({ items: itemsProp, userMenu }: Props) => {
  const items = compact(itemsProp);

  const { pathname } = useRouter();

  const itemsNode = (
    <div className="space-x-4 hidden ml-6 sm:flex flex-1">
      {items.map((item) => {
        const current = pathname === item?.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium',
            )}
            aria-current={current ? 'page' : undefined}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
  return (
    <div className="w-full px-8 bg-gray-800 flex items-center justify-center h-16">
      <MainIcon className="hidden sm:block" />

      {itemsNode}

      {userMenu && <div className="ml-3 hidden sm:block">{userMenu}</div>}
    </div>
  );
};
