import { Popover } from '@headlessui/react';

import { Button } from 'components/button';

import { ChildrenProp } from 'types/general';

export interface DashboardLayoutProps extends ChildrenProp {
  sideBar: React.ReactNode;
}

export const LayoutDashboard = ({ sideBar, children }: DashboardLayoutProps): JSX.Element => {
  const smSideBar = <div className="w-64 hidden sm:block h-screen">{sideBar}</div>;

  const xsSideBar = (
    <Popover className="relative sm:hidden">
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
