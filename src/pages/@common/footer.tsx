import { useEffect } from 'react';

import { Footer as FooterBase } from 'components/footer';

import { useGetOneBusiness } from 'features/api/useGetOneBusiness';

import { useRouter } from 'hooks/useRouter';

import { StyleProps } from 'types/general';

export interface FooterProps extends StyleProps {}

export const Footer = ({ ...props }: FooterProps) => {
  const { isDashboardPage, isBusinessPage, params } = useRouter();
  const { routeName } = params;

  const { getOneBusiness } = useGetOneBusiness();

  useEffect(() => {
    if (routeName && isBusinessPage) {
      getOneBusiness.fetch({ routeName });
    }
  }, [isBusinessPage]);

  if (isDashboardPage) {
    return <></>;
  }

  if (isBusinessPage) {
    const socialLinks = getOneBusiness.data?.socialLinks || {};

    return <FooterBase socialLinks={socialLinks} {...props} />;
  }

  return <FooterBase socialLinks={{}} {...props} />;
};
