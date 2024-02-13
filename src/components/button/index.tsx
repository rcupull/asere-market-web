import { forwardRef } from 'react';
import { Ellipsis } from 'react-css-spinners';
import { Link } from 'react-router-dom';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

const primaryStyles =
  'bg-indigo-600 text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 ';
const errorStyles = 'bg-red-600 text-white  hover:bg-red-500 disabled:bg-red-300';
const outlinedStyles =
  'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-500';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined' | 'error';
  label?: string;
  isBusy?: boolean;
  svg?: React.FunctionComponent<StyleProps>;
  stopPropagation?: boolean;
  needPremium?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'primary',
    label,
    isBusy,
    disabled,
    svg: Svg,
    stopPropagation,
    onClick,
    needPremium,
    ...omittedProps
  } = props;

  return (
    <button
      ref={ref}
      className={cn(
        'relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex justify-center disabled:cursor-not-allowed leading-6',
        {
          [primaryStyles]: variant === 'primary',
          [outlinedStyles]: variant === 'outlined',
          [errorStyles]: variant === 'error',
        },
        className,
      )}
      disabled={disabled || isBusy || needPremium}
      onClick={(e) => {
        if (stopPropagation) {
          e.stopPropagation();
        }

        onClick?.(e);
      }}
      {...omittedProps}
    >
      {Svg && <Svg className={cn('h-5 w-5', { ['mr-2']: label })} />}
      <span className='whitespace-nowrap overflow-hidden overflow-ellipsis max-w-24 sm:max-w-none'>{label}</span>
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

      {needPremium && <Link to='/price' className="absolute -top-2.5 -right-2.5 rounded-full px-0.5 py-1 ring-1 ring-green-800 text-xs text-gray-50 bg-green-600">Pro</Link>}
    </button>
  );
});
