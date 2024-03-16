import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { dynamic } from 'utils/makeLazy';

const PostId = dynamic(() => import('./routes/postId').then((m) => ({ default: m.PostId })));

const Home = dynamic(() =>
  import('./routes/home').then((m) => ({
    default: m.Home,
  })),
);

const AboutUs = dynamic(() =>
  import('./routes/about-us').then((m) => ({
    default: m.AboutUs,
  })),
);

export const BusinessRouteName = () => {
  const { params, isBusinessPage } = useRouter();
  const { routeName } = params;

  const { business, onRefresh, onReset } = useBusinessPageData();

  const handleRefresh = () => routeName && onRefresh({ routeName });
  useCallFromAfar(callAfarIds.useBusinessPageData_Refresh, handleRefresh);

  useEffect(() => {
    if (isBusinessPage && routeName && !business) {
      handleRefresh();

      return () => onReset();
    }
  }, [routeName]);

  if (!routeName || !business) return <></>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="about-us" element={<AboutUs />} />

      <Route path=":postId" element={<PostId />} />
    </Routes>
  );
};
