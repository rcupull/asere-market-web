import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Tabs } from 'components/tabs';

import { useRouter } from 'hooks/useRouter';

import { Loading } from './loading';
import { OptionsMenu } from './options-menu';
import { Posts } from './posts';
import { PostsSections } from './posts-sections';
import { Resources } from './resources';

import { LayoutSection } from 'pages/@common/layout-section';
import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';

export const RouteName = () => {
  const { params, query, onChangeQuery } = useRouter();
  const { routeName } = params;

  const businessOwnerData = useBusinessOwnerData();

  useEffect(() => {
    if (routeName) {
      businessOwnerData.onFetch({ routeName });
    }
  }, [routeName]);

  const business = businessOwnerData.data;
  const { isBusy, isFailed, wasCalled } = businessOwnerData.status;

  if (isBusy) {
    return <Loading />;
  }

  if (isFailed && wasCalled) {
    return <Navigate to="/dashboard/business" />;
  }

  if (!business || !routeName) {
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
            onRefresh={() => businessOwnerData.onFetch({ routeName })}
          />
        </div>
      }
    >
      <Tabs
        className="mt-4"
        contentClassName="w-full overflow-y-auto h-[calc(100vh-12rem)]"
        onSelect={(businessTab) => onChangeQuery({ businessTab })}
        selected={query.businessTab as number | undefined}
        items={[
          {
            label: 'Publicaciones',
            content: <Posts business={business} />,
          },
          {
            label: 'Secciones',
            content: (
              <PostsSections
                business={business}
                onRefresh={() => businessOwnerData.onFetch({ routeName })}
              />
            ),
          },
          {
            label: 'Recursos',
            content: <Resources business={business} />,
          },
        ]}
      />
    </LayoutSection>
  );
};
