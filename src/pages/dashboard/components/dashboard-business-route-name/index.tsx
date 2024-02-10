import { useEffect } from 'react';

import { useBusinessApi } from 'features/business/api';

import { useParams } from 'hooks/useReactRouter';

import { TablePosts } from './table-posts';

import { LayoutSection } from 'pages/@common/layout-section';
import { LayoutSectionSub } from 'pages/@common/layout-section-sub';

export const DashboardBusinessRouteName = () => {
  const { routeName } = useParams();

  const businessApi = useBusinessApi();

  useEffect(() => {
    onGetBussiness();
  }, []);

  const onGetBussiness = () => routeName && businessApi.getOne.fetch({ routeName });

  const business = businessApi.getOne.data;

  if (!business) {
    return <></>;
  }

  const businessName = business.name;

  return (
    <LayoutSection title={businessName} backButton>
      <LayoutSectionSub>{routeName && <TablePosts routeName={routeName} />}</LayoutSectionSub>
    </LayoutSection>
  );
};
