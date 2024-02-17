import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useRouter } from 'hooks/useRouter';

import { Nullable, StyleProps } from 'types/general';
import { cn } from 'utils/general';

interface SideBarItem extends StyleProps {
  label: string;
  href?: string;
  svg: React.FC<{ className?: string }>;
  divider?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  endElement?: React.ReactNode;
}

export interface SideBarProps extends StyleProps {
  items: Array<Nullable<SideBarItem>>;
  collapse?: boolean;
}

export const SideBar = ({ className, items, collapse }: SideBarProps) => {
  const { pathname } = useRouter();

  return (
    <div
      data-id="SideBar"
      className={cn(
        'flex flex-col items-center w-full h-full overflow-hidden text-gray-400 bg-gray-800 pb-3',
        className,
      )}
    >
      {items?.map((item, index) => {
        if (!item) return null;

        const { svg: Svg, href, label, divider, className, endElement, onClick } = item;
        const isActive = pathname === href;

        return (
          <Fragment key={index}>
            {divider && <hr className="w-full border-gray-700" />}

            {href ? (
              <Link
                className={cn(
                  'flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 overflow-hidden',
                  { ['bg-gray-600 text-gray-200']: isActive },
                  className,
                )}
                to={href}
              >
                <Svg className="w-6 h-6 stroke-current" />
                {!collapse && <span className="ml-2 text-sm font-medium">{label}</span>}

                {endElement}
              </Link>
            ) : (
              <div
                className={cn(
                  'flex items-center cursor-pointer w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 overflow-hidden',
                  { ['bg-gray-600 text-gray-200']: isActive },
                  className,
                )}
                onClick={onClick}
              >
                <Svg className="w-6 h-6 stroke-current" />
                {!collapse && <span className="ml-2 text-sm font-medium">{label}</span>}

                {endElement}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
