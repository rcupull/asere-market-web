import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOneBusiness } from 'features/api/useGetOneBusiness';

import { Banner } from './components/banner';
import { Pagination } from './components/pagination';
import { Posts } from './components/posts';
import { Search } from './components/search';

import { LayoutPage } from 'pages/@common/layout-page';

export const BusinessRouteName = () => {
  const { routeName } = useParams();

  const { getOneBusiness } = useGetOneBusiness();

  useEffect(() => {
    if (routeName) {
      getOneBusiness.fetch({ routeName });
      return () => {
        getOneBusiness.reset();
      };
    }
  }, []);

  const business = getOneBusiness.data;

  if (!routeName || !business) return <></>;

  return (
    <LayoutPage>
      <Banner business={business} />

      <Posts
        business={business}
        getSearch={(props) => <Search {...props} />}
        getPagination={(props) => <Pagination {...props} />}
      />
    </LayoutPage>
  );
};
