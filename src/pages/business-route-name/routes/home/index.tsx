import { PostsSectionsView } from 'components/posts-sections-view';

import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { Banner } from 'pages/business-route-name/components/banner';
import { Business } from 'types/business';

interface HomeProps {
  business: Business;
  onRefresh: () => void;
}
export const Home = ({ business, onRefresh }: HomeProps) => {
  const { pushRoute } = useRouter();

  return (
    <UpdateSomethingContainer
      title="Editar este negocio"
      onClick={() => pushRoute(`/dashboard/business/${business.routeName}`)}
    >
      <LayoutPage>
        <Banner business={business} />

        <PostsSectionsView
          business={business}
          onRefresh={onRefresh}
          layouts={business.layouts?.posts?.sections || []}
          visibility="businessPage"
        />
      </LayoutPage>
    </UpdateSomethingContainer>
  );
};
