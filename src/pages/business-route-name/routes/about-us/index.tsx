import { Navigate, useParams } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';
import { IconButtonUpdate } from 'components/icon-button-update';

import { useModal } from 'features/modal/useModal';

import { callAfarIds } from 'hooks/useCallFromAfar';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';

export const AboutUs = () => {
  const { routeName } = useParams();
  const { pushModal } = useModal();

  const { business } = useBusinessPageData();

  if (!routeName || !business) return <></>;

  const { description, title, visible } = business.aboutUsPage || {};

  if (!visible) {
    return <Navigate to={`/${routeName}`} />;
  }

  return (
    <LayoutPage title={title} >
      {description && (
        <HtmlTextContainer className="w-full" dangerouslySetInnerHTML={{ __html: description }} />
      )}

      <UpdateSomethingContainer position='top-right'>
        <IconButtonUpdate
          onClick={() =>
            pushModal('UpdateBusinessAboutUs', {
              routeName,
              callAfarResources: callAfarIds.useBusinessPageData_Refresh,
            })
          }
        />
      </UpdateSomethingContainer>
    </LayoutPage>
  );
};
