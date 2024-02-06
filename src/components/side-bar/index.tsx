import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { StyleProps } from 'types/general';

interface SideBarItem {
  label: string;
  href: string;
  svg: React.FC<{ className?: string }>;
  divider?: boolean;
}

export interface SideBarProps extends StyleProps {
  items: Array<SideBarItem>;
  collapse?: boolean;
}

export const SideBar = ({ className, items, collapse }: SideBarProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center w-fit h-full overflow-hidden text-gray-400 bg-gray-900 rounded pb-3',
        className,
      )}
    >
      {items?.map((item, index) => {
        const Svg = item.svg;
        return (
          <Fragment key={index}>
            {item.divider && <hr className="w-full border-gray-700" />}

            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              to={item.href}
            >
              <Svg className="w-6 h-6 stroke-current" />
              {!collapse && <span className="ml-2 text-sm font-medium">{item.label}</span>}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
};
