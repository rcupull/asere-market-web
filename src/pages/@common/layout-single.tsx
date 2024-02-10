import { BackButton } from 'components/back-button';

import { ChildrenProp } from 'types/general';
import { cn } from 'utils/general';

export interface LayoutSingleProps extends ChildrenProp {
  title?: string;
  backButton?: boolean;
}

export const LayoutSingle = ({ children, title, backButton }: LayoutSingleProps) => {
  return (
    <main className="flex flex-col items-center px-32">
      <div className="flex items-center justify-start w-full my-6">
        {backButton && <BackButton />}

        <h1
          className={cn('text-3xl font-semibold', {
            'ml-3': backButton,
          })}
        >
          {title}
        </h1>
      </div>

      {children}
    </main>
  );
};
