import { Field } from "formik";
import { forwardRef } from "react";
import { FormFieldWrapper, FormFieldWrapperProps } from "../form-field-wrapper";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    FormFieldWrapperProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, label, error, ...omittedProps } = props;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Field
        ref={ref}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...omittedProps}
      />
    </FormFieldWrapper>
  );
});
