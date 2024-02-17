import { Link } from 'react-router-dom';

import { Menu } from 'components/menu';

import { useAuthSignIn } from 'features/api/useAuthSignIn';

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface Props {
  className?: string;
  imageSrc?: string;
  items?: Array<MenuItem>;
}

export const UserMenu = ({ className, imageSrc, items }: Props) => {
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
      buttonElement={
        <>
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={imageSrc} alt="" />
        </>
      }
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
