import { LayoutPage } from 'pages/@common/layout-page';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { Banner } from 'pages/business-route-name/components/banner';
import { Pagination } from 'pages/business-route-name/components/pagination';
import { Posts } from 'pages/business-route-name/components/posts';
import { Search } from 'pages/business-route-name/components/search';

export const Home = () => {
  const { business } = useBusinessPageData();

  if (!business) {
    return <></>;
  }

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