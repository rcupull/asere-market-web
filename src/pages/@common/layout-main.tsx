import { Popover } from '@headlessui/react';

import { Button } from 'components/button';

import { useRouter } from 'hooks/useRouter';

import { ChildrenProp } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutMainProps extends ChildrenProp {
  sideBar: React.ReactNode;
}

export const LayoutMain = ({ sideBar, children }: LayoutMainProps): JSX.Element => {
  const { pathname } = useRouter();

  const isDashboard = pathname.includes('dashboard');

  const smSideBar = (
    <div
      className={cn('min-w-64 hidden h-screen', {
        'sm:block': isDashboard,
      })}
    >
      {sideBar}
    </div>
  );

  const xsSideBar = (
    <Popover className={cn("relative sm:hidden")}>
      {({ open, close }) => {
        return (
          <>
            {!open && (
              <Popover.Button className="absolute">
                <Button label="Abrir" variant="outlined" />
              </Popover.Button>
            )}

            <Popover.Panel className="absolute z-10">
              <div className="w-64 h-screen" onClick={() => close()}>
                {sideBar}
              </div>
            </Popover.Panel>
          </>
        );
      }}
    </Popover>
  );

  return (
    <div className="flex">
      {xsSideBar}
      {smSideBar}
      <div className="w-full p-3">{children}</div>
    </div>
  );
};
