import { Navigate } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { useBusinessUpdateAboutUs } from 'pages/@hooks/useBusinessUpdateAboutUs';
import { Business } from 'types/business';

interface AboutUsProps {
  business: Business;
}

export const AboutUs = ({ business }: AboutUsProps) => {
  const { routeName, aboutUsPage } = business;
  const { description, title, visible } = aboutUsPage || {};

  const { onRefresh } = useBusinessPageData();

  const businessUpdateAboutUs = useBusinessUpdateAboutUs();

  if (!visible) {
    return <Navigate to={`/${routeName}`} />;
  }

  return (
    <UpdateSomethingContainer
      title="Editar la descripción de mi negocio"
      onClick={() =>
        businessUpdateAboutUs.open({ business, onRefresh: () => onRefresh({ routeName }) })
      }
    >
      <LayoutPage title={title}>
        {description && (
          <HtmlTextContainer className="w-full" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </LayoutPage>
    </UpdateSomethingContainer>
  );
};
