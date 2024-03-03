import { useGetOneBusiness } from 'features/api/useGetOneBusiness';

import { useRouter } from 'hooks/useRouter';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface BusinessNameProps extends StyleProps {}

export const BusinessName = ({ className }: BusinessNameProps) => {
  const { params, pathname } = useRouter();
  const { routeName } = params;

  const isBusinessPage = pathname === `/${routeName}`;
  const { getOneBusiness } = useGetOneBusiness();
  const { name } = getOneBusiness.data || {};

  return (
    <div
      className={cn(
        'text-gray-300 text-2xl text-nowrap overflow-hidden min-w-20 text-ellipsis',
        className,
      )}
    >
      {isBusinessPage ? name : 'Hook'}
    </div>
  );
};
