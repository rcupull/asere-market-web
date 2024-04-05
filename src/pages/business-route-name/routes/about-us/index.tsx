import { Navigate } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';

import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { Business } from 'types/business';

interface AboutUsProps {
  business: Business;
}

export const AboutUs = ({ business }: AboutUsProps) => {
  const { routeName, aboutUsPage } = business;
  const { description, title, visible } = aboutUsPage || {};

  const { pushModal } = useModal();

  const { onRefresh } = useBusinessPageData();

  const callAfarResources = 'businessRouteName_aboutUs_businessPageData_onRefresh';
  useCallFromAfar(callAfarResources, () => onRefresh({ routeName }));

  if (!visible) {
    return <Navigate to={`/${routeName}`} />;
  }

  return (
    <UpdateSomethingContainer
      title="Editar la descripción de mi negocio"
      onClick={() => pushModal('UpdateBusinessAboutUs', { routeName, callAfarResources })}
    >
      <LayoutPage title={title}>
        {description && (
          <HtmlTextContainer className="w-full" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </LayoutPage>
    </UpdateSomethingContainer>
  );
};
