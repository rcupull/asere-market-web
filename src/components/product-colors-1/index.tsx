import { RadioGroup } from '@headlessui/react';
import { useEffect, useState } from 'react';

import { StyleProps } from 'types/general';
import {  PostColor } from 'types/post';
import { cn } from 'utils/general';

export interface ProductColors1Props  extends StyleProps{
  title?: string
  items?: Array<PostColor>
  value?: PostColor;
  onChange?: (value:PostColor)=>void 
}

export const ProductColors1 = ({ title, value, items,onChange, className }: ProductColors1Props) => {
  const [state, setState] = useState<PostColor>();


  useEffect(()=>{
    setState(value)
  },[value])

  const handleChange = (selectedValue: PostColor) => {
    setState(selectedValue)
    onChange?.(selectedValue)
  }

  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>

      <RadioGroup value={state} onChange={handleChange} className="mt-4">
        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
        <div className="flex items-center space-x-3">
          {items?.map((color) => (
            <RadioGroup.Option
              key={color.name}
              value={color}
              className={({ active, checked }) =>
                cn(
                  color.selectedRingColor,
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                )
              }
            >
              <RadioGroup.Label as="span" className="sr-only">
                {color.name}
              </RadioGroup.Label>
              <span
                aria-hidden="true"
                className={cn(
                  color.bgColor,
                  'h-8 w-8 rounded-full border border-black border-opacity-10',
                )}
              />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
