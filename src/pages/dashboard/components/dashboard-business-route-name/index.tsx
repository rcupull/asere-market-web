import { useEffect } from 'react';

import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';

import { useParams } from 'hooks/useReactRouter';

import { TablePosts } from './table-posts';

import { LayoutSection } from 'pages/@common/layout-section';
import { LayoutSectionSub } from 'pages/@common/layout-section-sub';

export const DashboardBusinessRouteName = () => {
  const { routeName } = useParams();

  const { getOneUserBusiness } = useGetOneUserBusiness();

  const onGetBussiness = () => routeName && getOneUserBusiness.fetch({ routeName });

  useEffect(() => {
    onGetBussiness();
  }, []);

  const business = getOneUserBusiness.data;

  if (!business) {
    return <></>;
  }

  const { name, hidden } = business;


  const hiddenBusinessElement = <div className="text-red-500 ring-1 ring-red-400 rounded-3xl px-2 py-1/2 text-sm sm:text-lg">Este negocio no está visible</div>
  return (
    <LayoutSection
      title={name}
      backButton
      topRightHeader={hidden && hiddenBusinessElement}
    >
      <LayoutSectionSub>{routeName && <TablePosts routeName={routeName} />}</LayoutSectionSub>
    </LayoutSection>
  );
};
