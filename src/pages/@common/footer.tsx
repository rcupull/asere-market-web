import { Footer as FooterBase } from 'components/footer';

import { useRouter } from 'hooks/useRouter';

import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { StyleProps } from 'types/general';

export interface FooterProps extends StyleProps {}

export const Footer = ({ ...props }: FooterProps) => {
  const { isDashboardPage } = useRouter();

  const { business } = useBusinessPageData();

  if (isDashboardPage) {
    return <></>;
  }

  if (business) {
    const socialLinks = business.socialLinks || {};

    return <FooterBase socialLinks={socialLinks} {...props} />;
  }

  return <FooterBase socialLinks={{}} {...props} />;
};
