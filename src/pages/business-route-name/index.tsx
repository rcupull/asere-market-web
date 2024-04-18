import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useRouter } from 'hooks/useRouter';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useSales } from 'pages/@hooks/useSales';
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

  const business = useBusiness();
  const sales = useSales();

  useEffect(() => {
    if (routeName) {
      business.onFetch({ routeName });
      sales.onFetch({ routeName });

      return () => {
        business.onReset();
        sales.onReset();
      };
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
