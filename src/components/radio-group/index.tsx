import { RadioGroup as RadioGroupBase } from '@headlessui/react';

import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface RadioGroupProps<O, V = any> extends StyleProps {
  items: Array<O>;
  value?: V;
  onChange?: (newValue: V) => void;
  renderOption: (args: { checked: boolean; item: O; index: number }) => React.ReactElement;
  optionToValue: (item: O) => V;
  onBlur?: () => void;
  isBusy?: boolean;
}

//eslint-disable-next-line
export const RadioGroup = <O extends any = any>({
  className,
  items,
  value,
  onChange,
  onBlur,
  renderOption,
  optionToValue,
  isBusy,
}: RadioGroupProps<O>) => {
  return (
    <RadioGroupBase
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      className={cn('relative', className)}
    >
      {items.map((item, index) => {
        const value = optionToValue(item);

        return (
          <RadioGroupBase.Option key={index} value={value}>
            {({ checked }) => renderOption({ checked, item, index })}
          </RadioGroupBase.Option>
        );
      })}
      {isBusy && (
        <div className="absolute inset-0 bg-white opacity-55 flex items-center justify-center">
          <SpinnerEllipsis />
        </div>
      )}
    </RadioGroupBase>
  );
};
