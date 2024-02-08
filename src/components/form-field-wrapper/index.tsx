import { Nullable, StyleProps } from 'types/general';

export interface FormFieldWrapperProps extends StyleProps {
  error?: Nullable<string>;
  label?: string;
}

export const FormFieldWrapper = ({
  className,
  label,
  error,
  children,
}: FormFieldWrapperProps & { children: React.ReactNode }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">{label}</label>
      )}
      {children}
      <span className='text-red-500 text-xs'>{error}</span>
    </div>
  );
};
