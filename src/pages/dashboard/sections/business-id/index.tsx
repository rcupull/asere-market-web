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

  return (
    <LayoutSection title={businessApi.getOne.data?.name} backButton>
      <TablePosts businessId={businessId} />
    </LayoutSection>
  );
};
