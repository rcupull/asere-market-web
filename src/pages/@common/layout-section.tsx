import { BackButton } from 'components/back-button';

import { ChildrenProp } from 'types/general';

export interface LayoutSectionProps extends ChildrenProp {
  backButton?: boolean;
  title?: string;
}

export const LayoutSection = ({ backButton, title, children }: LayoutSectionProps): JSX.Element => {
  return (
    <div>
      {backButton && <BackButton />}

      {title && <h1 className="text-2xl font-bold mt-3">{title}</h1>}

      {children}
    </div>
  );
};
