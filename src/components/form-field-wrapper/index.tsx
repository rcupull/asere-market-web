import { Nullable, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FormFieldWrapperProps extends StyleProps {
  label?: React.ReactNode;
}

export const FormFieldWrapper = ({
  className,
  label,
  error,
  children,
}: FormFieldWrapperProps & { children: React.ReactNode; error?: Nullable<string> }) => {
  return (
    <div data-id="FormFieldWrapper" className={cn(className)}>
      {label && (
        <label
          className={cn('block text-sm font-semibold leading-6 text-gray-900 mb-2 w-fit', {
            'text-red-500': !!error,
          })}
        >
          {label}
        </label>
      )}
      {children}
      <span className="text-red-500 text-xs">{error}</span>
    </div>
  );
};
