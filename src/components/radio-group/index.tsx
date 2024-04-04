import { RadioGroup as RadioGroupBase } from '@headlessui/react';

import { StyleProps } from 'types/general';

// type RenderOption<O> = (args: { checked: boolean; item: O; }) => React.ReactElement;

// const defaultRenderOption: RenderOption<any> = ({ checked, item }) => {
//   return <FieldCheckbox noUseFormik value={checked} label={`${item}`} />
// };

export interface RadioGroupProps<O, V = any> extends StyleProps {
  items: Array<O>;
  label?: string;
  value?: V;
  onChange?: (newValue: V) => void;
  renderOption: (args: { checked: boolean; item: O; index: number }) => React.ReactElement;
  optionToValue: (item: O) => V;
}

//eslint-disable-next-line
export const RadioGroup = <O extends any = any>({
  className,
  items,
  value,
  onChange,
  renderOption,
  optionToValue,
}: RadioGroupProps<O>) => {
  return (
    <RadioGroupBase value={value} onChange={onChange} className={className}>
      {items.map((item, index) => {
        const value = optionToValue(item);

        return (
          <RadioGroupBase.Option key={index} value={value}>
            {({ checked }) => renderOption({ checked, item, index })}
          </RadioGroupBase.Option>
        );
      })}
    </RadioGroupBase>
  );
};
