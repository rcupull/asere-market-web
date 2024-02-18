import { useGetOneBusiness } from 'features/api/useGetOneBusiness';

import { useRouter } from 'hooks/useRouter';

import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';

const localSrc = 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500';

export interface MainIconProps extends StyleProps {}

export const MainIcon = ({ className }: MainIconProps) => {
  const { params, pathname } = useRouter();
  const { routeName } = params;

  const isBusinessPage = pathname === `/${routeName}`;
  const { getOneBusiness } = useGetOneBusiness();
  const business = getOneBusiness.data;

  const getLogoSrc = () => {
    const { logo } = business || {};

    if (isBusinessPage && logo) {
      const { src } = logo;
      return getImageEndpoint(src);
    }

    return localSrc;
  };

  return (
    <div className={className}>
      <img className="h-8 w-auto" src={getLogoSrc()} alt="Your Company" />
    </div>
  );
};
