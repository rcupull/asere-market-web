import { Footer as FooterBase } from 'components/footer';

import { StyleProps } from 'types/general';

export interface FooterProps extends StyleProps {}

export const Footer = ({ ...props }: FooterProps) => {
  return <FooterBase {...props} />;
};
