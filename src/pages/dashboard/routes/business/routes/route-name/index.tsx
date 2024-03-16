import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Tabs } from 'components/tabs';

import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';

import { useRouter } from 'hooks/useRouter';

import { Layouts } from './layouts';
import { Loading } from './loading';
import { OptionsMenu } from './options-menu';
import { Posts } from './posts';
import { Resources } from './resources';

import { LayoutSection } from 'pages/@common/layout-section';

export const RouteName = () => {
  const { params, query, onChangeQuery } = useRouter();
  const { routeName } = params;

  const { getOneUserBusiness } = useGetOneUserBusiness();

  const onRefresh = () => routeName && getOneUserBusiness.fetch({ routeName });

  useEffect(() => {
    if (routeName) {
      onRefresh();
    }
  }, [routeName]);

  const business = getOneUserBusiness.data;
  const { isBusy, isFailed, wasCalled } = getOneUserBusiness.status;

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

          <OptionsMenu business={business} onRefresh={onRefresh} />
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
            label: 'Recursos',
            content: <Resources business={business} />,
          },
          {
            label: 'Diseños',
            content: <Layouts business={business} onRefresh={onRefresh} />,
          },
        ]}
      />
    </LayoutSection>
  );
};
