import { Link } from 'react-router-dom';

import { IconButtonUpdate } from 'components/icon-button-update';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { Banner } from 'pages/business-route-name/components/banner';
import { Pagination } from 'pages/business-route-name/components/pagination';
import { Posts } from 'pages/business-route-name/components/posts';
import { Search } from 'pages/business-route-name/components/search';
import { Business } from 'types/business';

interface HomeProps {
  business: Business;
}
export const Home = ({ business }: HomeProps) => {
  return (
    <LayoutPage>
      <Banner business={business} />

      <Posts
        business={business}
        getSearch={(props) => <Search {...props} />}
        getPagination={(props) => <Pagination {...props} />}
      />

      <UpdateSomethingContainer position="top-right">
        <Link to={`/dashboard/business/${business.routeName}`}>
          <IconButtonUpdate />
        </Link>
      </UpdateSomethingContainer>
    </LayoutPage>
  );
};
