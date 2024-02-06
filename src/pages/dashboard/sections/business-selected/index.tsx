import { useEffect } from 'react';

import { useBusinessApi } from 'features/business/api';

import { useParams } from 'hooks/useReactRouter';

import { TablePosts } from './table-posts';

export const SectionBusinessSelected = () => {
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
    <div>
      <TablePosts businessId={businessId} />
    </div>
  );
};
