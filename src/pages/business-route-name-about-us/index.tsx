import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';
import { IconButtonUpdate } from 'components/icon-button-update';

import { useModal } from 'features/modal/useModal';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdatePageContainer } from 'pages/@common/update-page-container';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';

export const BusinessRouteNameAboutUs = () => {
  const { routeName } = useParams();
  const { pushModal } = useModal();

  const { business, onRefresh } = useBusinessPageData();

  useCallFromAfar(callAfarIds.useBusinessPageData, onRefresh);

  useEffect(() => {
    onRefresh();
  }, []);

  if (!routeName || !business) return <></>;

  const { description, title, visible } = business.aboutUsPage || {};

  if (!visible) {
    return <Navigate to={`/${routeName}`} />;
  }

  return (
    <LayoutPage title={title}>
      {description && (
        <HtmlTextContainer className="w-full" dangerouslySetInnerHTML={{ __html: description }} />
      )}

      <UpdatePageContainer>
        <IconButtonUpdate
          onClick={() =>
            pushModal('UpdateBusinessAboutUs', {
              routeName,
              callAfarResources: callAfarIds.useBusinessPageData,
            })
          }
        />
      </UpdatePageContainer>
    </LayoutPage>
  );
};
