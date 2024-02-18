import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

const imageSrc =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export interface UserAvatarProps extends StyleProps {}

export const UserAvatar = ({ className }: UserAvatarProps) => {
  return <img className={cn('h-8 w-8 rounded-full', className)} src={imageSrc} alt="" />;
};
