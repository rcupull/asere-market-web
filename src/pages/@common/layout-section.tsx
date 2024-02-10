import { BackButton } from 'components/back-button';

import { ChildrenProp } from 'types/general';

export interface LayoutSectionProps extends ChildrenProp {
  backButton?: boolean;
  title?: string;
}

export const LayoutSection = ({ backButton, title, children }: LayoutSectionProps): JSX.Element => {
  return (
    <div>
      <div className="flex items-center">
        {backButton && <BackButton />}

        {title && <h1 className="ml-auto text-2xl font-bold">{title}</h1>}
      </div>

      {children}
    </div>
  );
};
