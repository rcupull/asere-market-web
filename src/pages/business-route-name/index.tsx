import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useRouter } from 'hooks/useRouter';

import { useBusiness } from 'pages/@hooks/useBusiness';
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

  const { business, onFetch, onReset } = useBusiness();

  useEffect(() => {
    if (routeName) {
      onFetch({ routeName });

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
