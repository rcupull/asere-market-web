import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { HtmlTextContainer } from 'components/html-text-container';

import { LayoutPage } from 'pages/@common/layout-page';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';

export const BusinessRouteNameAboutUs = () => {
  const { routeName } = useParams();

  const { business, onRefresh } = useBusinessPageData();

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
      {description && <HtmlTextContainer className='w-full' dangerouslySetInnerHTML={{ __html: description }} />}
    </LayoutPage>
  );
};
