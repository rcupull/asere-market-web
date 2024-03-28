import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { Banner } from 'pages/business-route-name/components/banner';
import { PostsSection } from 'pages/business-route-name/routes/home/components/posts-section';
import { Business } from 'types/business';

interface HomeProps {
  business: Business;
  onRefresh: () => void;
}
export const Home = ({ business, onRefresh }: HomeProps) => {
  const postLayoutSections = business.layouts?.posts?.sections;
  const { pushRoute } = useRouter();

  return (
    <UpdateSomethingContainer
      onClick={() => pushRoute(`/dashboard/business/${business.routeName}`)}
    >
      <LayoutPage>
        <Banner business={business} />

        <div className="flex flex-col">
          {postLayoutSections?.map((layout, index) => {
            return (
              <PostsSection
                key={index}
                index={index}
                business={business}
                onRefresh={onRefresh}
                layout={layout}
              />
            );
          })}
        </div>
      </LayoutPage>
    </UpdateSomethingContainer>
  );
};
