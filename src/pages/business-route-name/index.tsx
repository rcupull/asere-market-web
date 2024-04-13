import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

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
  const { params } = useRouter();
  const { routeName } = params;

  const { business, onRefresh, onReset } = useBusinessPageData();

  useEffect(() => {
    if (routeName) {
      onRefresh({ routeName });

      return () => onReset();
    }
  }, [routeName]);

  if (!routeName || !business) return <></>;

  return (
    <Routes>
      <Route path="/" element={<Home routeName={routeName} />} />

      <Route path="about-us" element={<AboutUs routeName={routeName} />} />

      <Route path=":postId" element={<PostId routeName={routeName} />} />
    </Routes>
  );
};
