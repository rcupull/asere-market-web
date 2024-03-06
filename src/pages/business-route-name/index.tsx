import { useParams } from 'react-router-dom';

import { Banner } from './components/banner';
import { Pagination } from './components/pagination';
import { Posts } from './components/posts';
import { Search } from './components/search';

import { LayoutPage } from 'pages/@common/layout-page';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';

export const BusinessRouteName = () => {
  const { routeName } = useParams();

  const { business } = useBusinessPageData();

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
