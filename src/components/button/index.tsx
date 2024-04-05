import { forwardRef } from 'react';
import { Ellipsis } from 'react-css-spinners';

import { ProLink } from 'components/pro-link';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

const primaryStyles =
  'bg-indigo-600 text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
const errorStyles = 'bg-red-600 text-white  hover:bg-red-500';
const linkStyles = 'text-indigo-600  hover:text-indigo-500 shadow-none';
const outlinedStyles = 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined' | 'error' | 'link';
  label?: string;
  isBusy?: boolean;
  svg?: React.FunctionComponent<StyleProps>;
  stopPropagation?: boolean;
  needPremium?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'primary',
    label,
    isBusy,
    disabled: disabledProp,
    svg: Svg,
    stopPropagation,
    onClick,
    needPremium,
    ...omittedProps
  } = props;

  const disabled = disabledProp || isBusy || needPremium;

  return (
    <button
      ref={ref}
      className={cn(
        'relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6',
        {
          [primaryStyles]: variant === 'primary',
          [outlinedStyles]: variant === 'outlined',
          [errorStyles]: variant === 'error',
          [linkStyles]: variant === 'link',
          ['cursor-not-allowed']: disabled,
          ['!bg-indigo-300']: variant === 'primary' && disabled,
          ['!bg-gray-300']: variant === 'outlined' && disabled,
          ['!bg-red-300']: variant === 'error' && disabled,
        },
        className,
      )}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        if (stopPropagation) {
          e.stopPropagation();
        }

        onClick?.(e);
      }}
      {...omittedProps}
    >
      {Svg && <Svg className={cn('h-5 w-5', { ['mr-2']: label })} />}
      <span className="whitespace-nowrap">{label}</span>
      {isBusy && (
        <Ellipsis
          size={40}
          style={{
            position: 'absolute',
            top: '0px',
            height: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}

      {needPremium && <ProLink className="absolute -top-2.5 -right-2.5" />}
    </button>
  );
});
