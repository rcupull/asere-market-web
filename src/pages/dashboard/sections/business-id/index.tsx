import { useEffect } from 'react';

import { useBusinessApi } from 'features/business/api';

import { useParams } from 'hooks/useReactRouter';

import { TablePosts } from './table-posts';

import { LayoutSection } from 'pages/@common/layout-section';
import { LayoutSectionSub } from 'pages/@common/layout-section-sub';

export const SectionBusinessId = () => {
  const { businessId } = useParams();

  const businessApi = useBusinessApi();

  useEffect(() => {
    onGetBussiness();
  }, []);

  if (!businessId) {
    return <></>;
  }

  const onGetBussiness = () => businessApi.getOne.fetch({ id: businessId });

  const businessName = businessApi.getOne.data?.name;
  const title = businessName ? `Negocio (${businessName})` : '';

  return (
    <LayoutSection title={title} backButton>
      <LayoutSectionSub title="Publicaciones">
        <TablePosts businessId={businessId} />
      </LayoutSectionSub>
    </LayoutSection>
  );
};
