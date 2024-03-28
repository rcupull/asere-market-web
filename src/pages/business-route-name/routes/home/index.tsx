import { Link } from 'react-router-dom';

import { IconButtonUpdate } from 'components/icon-button-update';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { Banner } from 'pages/business-route-name/components/banner';
import { PostsSection } from 'pages/business-route-name/routes/home/components/posts-section';
import { Business } from 'types/business';

interface HomeProps {
  business: Business;
}
export const Home = ({ business }: HomeProps) => {
  const postLayoutSections = business.layouts?.posts?.sections;

  return (
    <UpdateSomethingContainer
      button={
        <Link to={`/dashboard/business/${business.routeName}`}>
          <IconButtonUpdate />
        </Link>
      }
    >
      <LayoutPage>
        <Banner business={business} />

        <div className="flex flex-col">
          {postLayoutSections?.map((postLayoutSection, index) => {
            return (
              <PostsSection
                key={index}
                index={index}
                business={business}
                layout={postLayoutSection}
              />
            );
          })}
        </div>
      </LayoutPage>
    </UpdateSomethingContainer>
  );
};
