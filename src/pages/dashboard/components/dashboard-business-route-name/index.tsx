import { useEffect } from 'react';

import { Tabs } from 'components/tabs';

import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';

import { useRouter } from 'hooks/useRouter';

import { BannerImages } from './banner-images';
import { Loading } from './loading';
import { NotFound } from './no-found';
import { OptionsMenu } from './options-menu';
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
  const { isBusy, isFailed, wasCalled } = getOneUserBusiness.status;

  if (isBusy) {
    return <Loading />;
  }

  if (isFailed && wasCalled) {
    return <NotFound />;
  }

  if (!business) {
    return <></>;
  }

  const { name, hidden } = business;

  return (
    <LayoutSection
      title={name}
      topRightHeader={
        <div className="flex items-center gap-6">
          {hidden && (
            <div className="text-red-500 ring-1 ring-red-400 rounded-3xl px-2 py-1/2 text-sm sm:text-lg">
              Oculto
            </div>
          )}

          <OptionsMenu
            business={business}
            onRefresh={() => routeName && onGetBussiness(routeName)}
          />
        </div>  
      }
    >
      <Tabs
        className="mt-4"
        onSelect={(selectedTab) => onChangeQuery({ tab: selectedTab })}
        selected={tab as number | undefined}
        items={[
          {
            label: 'Publicaciones',
            content: <TablePosts business={business} />,
          },
          {
            label: 'Banner',
            content: <BannerImages business={business} />,
          },
        ]}
      />
    </LayoutSection>
  );
};
