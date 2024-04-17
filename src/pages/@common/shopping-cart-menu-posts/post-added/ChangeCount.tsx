import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import { IconButton } from 'components/icon-button';
import { Input } from 'components/input';

import { useDebouncer } from 'hooks/useDebouncer';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface ChangeCountProps extends StyleProps {
  value: number;
  onChange: (newValue: number) => void;
}

export const ChangeCount = ({ value, onChange, className }: ChangeCountProps) => {
  const [state, setState] = useState<number>(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  const debouncer = useDebouncer();

  const handleChange = (newValue: number) => {
    setState(newValue);
    debouncer(() => onChange(newValue), 500);
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <IconButton
        svg={ChevronLeftIcon}
        stopPropagation
        onClick={() => {
          handleChange(state - 1);
        }}
        className="border border-gray-300 !rounded-md !p-0.5"
      />

      <Input
        value={state || 0}
        onChange={(e) => handleChange(Number(e.target.value))}
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        className="!w-12 !text-center"
      />

      <IconButton
        svg={ChevronRightIcon}
        stopPropagation
        onClick={() => {
          handleChange(state + 1);
        }}
        className="border border-gray-300 !rounded-md !p-0.5"
      />
    </div>
  );
};
