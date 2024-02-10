import { BackButton } from 'components/back-button';

import { ChildrenProp } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutSectionProps extends ChildrenProp {
  backButton?: boolean;
  title?: string;
}

export const LayoutSection = ({ backButton, title, children }: LayoutSectionProps): JSX.Element => {
  return (
    <div>
      <div className="flex items-start">
        {backButton && <BackButton />}

        {title && (
          <h1
            className={cn('text-2xl font-semibold', {
              'ml-3': backButton,
            })}
          >
            {title}
          </h1>
        )}
      </div>

      {children}
    </div>
  );
};
