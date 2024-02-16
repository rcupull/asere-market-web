import { useEffect } from 'react';

import { Tabs } from 'components/tabs';

import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';

import { useRouter } from 'hooks/useRouter';

import { BannerImages } from './banner-images';
import { TablePosts } from './table-posts';

import { LayoutSection } from 'pages/@common/layout-section';

export const DashboardBusinessRouteName = () => {
  const { params, query, onChangeQuery } = useRouter();
  const { routeName } = params;
  const { tab } = query;

  const { getOneUserBusiness } = useGetOneUserBusiness();

  const onGetBussiness = (routeName: string) => getOneUserBusiness.fetch({ routeName });

  useEffect(() => {
    if (routeName) {
      onGetBussiness(routeName);
    }
  }, [routeName]);

  useEffect(() => {
    if (tab === undefined) {
      onChangeQuery({ tab: 0 });
    }
  }, []);

  const business = getOneUserBusiness.data;

  if (!business) {
    return <></>;
  }

  const { name, hidden } = business;

  const hiddenBusinessElement = (
    <div className="text-red-500 ring-1 ring-red-400 rounded-3xl px-2 py-1/2 text-sm sm:text-lg">
      Este negocio no está visible
    </div>
  );

  return (
    <LayoutSection title={name} backButton topRightHeader={hidden && hiddenBusinessElement}>
      <Tabs
        onSelect={(selectedTab) => onChangeQuery({ tab: selectedTab })}
        selected={tab as number | undefined}
        items={[
          {
            label: 'Post',
            content: <TablePosts business={business} />,
          },
          {
            label: 'Banner',
            content: <BannerImages business={business} />,
          },
        ]}
      />

      {/* <LayoutSectionSub title="Publicaciones">
        <TablePosts business={business} />
      </LayoutSectionSub>

      <LayoutSectionSub title="Imágenes del banner">
        <BannerImages business={business} />
      </LayoutSectionSub> */}
    </LayoutSection>
  );
};
