import { useEffect } from 'react';

import { useBusinessApi } from 'features/business/api';

import { useParams } from 'hooks/useReactRouter';

import { TablePosts } from './table-posts';

import { LayoutSection } from 'pages/@common/layout-section';

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


  const title = businessApi.getOne.data?.name ? `Negocio (${businessApi.getOne.data?.name})` : "";

  
  return (
    <LayoutSection title={title} backButton>
      <TablePosts businessId={businessId} />
    </LayoutSection>
  );
};
