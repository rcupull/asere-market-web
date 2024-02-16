import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

interface TabItem extends StyleProps {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps extends StyleProps {
  items: Array<TabItem>;
  selected?: number;
  onSelect?: (newSelected: number) => void;
}

export const Tabs = ({ items, className, onSelect, selected }: TabsProps) => {
  return (
    <Tab.Group selectedIndex={selected} onChange={onSelect}>
      <Tab.List className={cn('flex', className)}>
        {items.map(({ label, className }, index) => {
          return (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                <div
                  className={cn(
                    'w-full mx-1 max-w-28 cursor-pointer text-center p-2 bg-gray-50 rounded-sm hover:bg-gray-100 border-b-2 border-transparent focus-visible:outline-none',
                    {
                      '!border-indigo-600': selected,
                    },
                    className,
                  )}
                >
                  {label}
                </div>
              )}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels>
        {items.map(({ content }, index) => {
          return (
            <Tab.Panel className="pt-4" key={index}>
              {content}
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
};
