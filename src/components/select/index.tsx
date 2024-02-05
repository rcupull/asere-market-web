import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { AnyRecord, StyleProps } from "../../types/general";
import cn from "classnames";
import { FormFieldWrapper, FormFieldWrapperProps } from "../form-field-wrapper";
import { useField } from "formik";

export interface SelectProps<Option extends AnyRecord = AnyRecord, Value extends any = any>
  extends StyleProps,
    FormFieldWrapperProps {
  onChange?: (e: React.ChangeEvent) => void;
  value?: Value;
  items: Array<Option>;
  optionToValue?: (option: Option)=>Value
  renderOption: (option: Option) => React.ReactNode;
  renderValue: (option: Option) => React.ReactNode;
  name: string;
}

export const Select = <Value extends AnyRecord = AnyRecord>(
  props: SelectProps<Value>
) => {
  const {
    value,
    items,
    onChange,
    renderOption,
    renderValue,
    label,
    className,
    error,
    name,
    optionToValue
  } = props;
  const [state, setState] = useState<Value>();

  const [field] = useField({
    name,
    onChange,
  });

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Listbox
        value={value}
        onChange={(newSelectedOption) => {
          setState(newSelectedOption);

          const newSelectedValue = optionToValue ? optionToValue(newSelectedOption) : newSelectedOption;

          field.onChange({
            target: {
              name: field.name,
              value: newSelectedValue,
            },
          });
        }}
      >
        {({ open }) => (
          <div className={cn("relative w-64")}>
            <Listbox.Button
              name={field.name}
              onBlur={field.onBlur}
              className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
              <div className="flex items-center h-5">
                {state && renderValue(state)}
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item, index) => {
                  return (
                    <Listbox.Option
                      key={index}
                      className={({ active }) => {
                        return cn(
                          "text-gray-900 relative select-none cursor-pointer",
                          {
                            ["bg-indigo-600 text-white"]: active,
                          }
                        );
                      }}
                      value={item}
                    >
                      {({ selected }) => (
                        <div
                          className={cn("p-2", {
                            ["bg-gray-200"]: selected,
                          })}
                        >
                          <div className={"flex items-center ml-3 truncate"}>
                            {renderOption(item)}
                          </div>

                          {selected && (
                            <span
                              className={cn(
                                "bg-inherit absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </FormFieldWrapper>
  );
};
