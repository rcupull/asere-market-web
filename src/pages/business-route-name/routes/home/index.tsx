import { PostsSectionsView } from 'components/posts-sections-view';

import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';
import { Banner } from 'pages/business-route-name/components/banner';

interface HomeProps {
  routeName: string;
}
export const Home = ({ routeName }: HomeProps) => {
  const { pushRoute } = useRouter();

  const { business } = useBusinessOwnerData();

  return (
    <UpdateSomethingContainer
      title="Editar este negocio"
      onClick={() => pushRoute(`/dashboard/business/${routeName}`)}
    >
      <LayoutPage>
        <Banner routeName={routeName} />

        <PostsSectionsView
          routeName={routeName}
          layouts={business?.layouts?.posts?.sections || []}
          visibility="businessPage"
        />
      </LayoutPage>
    </UpdateSomethingContainer>
  );
};
