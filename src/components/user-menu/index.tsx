import { Link } from 'react-router-dom';

import { Menu, MenuProps } from 'components/menu';
import { UserAvatar } from 'components/user-avatar';

import { useAuthSignIn } from 'features/api/useAuthSignIn';

export interface Props {
  className?: string;
  items?: MenuProps['items'];
}

export const UserMenu = ({ className, items }: Props) => {
  const { authData } = useAuthSignIn();

  if (!authData) {
    return (
      <Link className="text-slate-100" to="/sign-in">
        Iniciar Sesión
      </Link>
    );
  }

  const { user } = authData;

  const { email, name } = user;

  return (
    <Menu
      buttonElement={<UserAvatar />}
      headerElement={
        <div className="px-2 py-3 flex flex-col items-center border">
          <span className="text-sm border px-2 py-1 rounded-2xl">{name}</span>
          <span className="text-xs mt-2">{email}</span>
        </div>
      }
      items={items}
      className={className}
    />
  );
};
