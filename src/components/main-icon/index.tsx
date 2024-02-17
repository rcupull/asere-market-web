import { StyleProps } from 'types/general';

export interface MainIconProps extends StyleProps {}

export const MainIcon = ({ className }: MainIconProps) => {
  return (
    <div className={className}>
      <img
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
    </div>
  );
};
