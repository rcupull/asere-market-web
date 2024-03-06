import { Button } from 'components/button';

import { useModal } from 'features/modal/useModal';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { Business } from 'types/business';

export interface PostCategoriesProps {
  business: Business;
}

export const PostCategories = ({ business }: PostCategoriesProps) => {
  const { routeName } = business;

  const { pushModal } = useModal();

  return (
    <LayoutPageSection>
      <div className="flex">
        <Button
          label="Adicionar o editar las categorías"
          onClick={() => pushModal('PostCategories', { routeName })}
        />
      </div>
    </LayoutPageSection>
  );
};
