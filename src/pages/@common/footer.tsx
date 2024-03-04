import { Footer as FooterBase } from 'components/footer';

import { useRouter } from 'hooks/useRouter';

import { StyleProps } from 'types/general';

export interface FooterProps extends StyleProps {}

export const Footer = ({ ...props }: FooterProps) => {
  const { isDashboardPage } = useRouter();

  if (isDashboardPage) {
    return <></>;
  }

  return <FooterBase {...props} />;
};
