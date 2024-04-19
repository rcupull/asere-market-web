import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useShopping } from 'pages/@hooks/useShopping';
import { dynamic } from 'utils/makeLazy';

const PostId = dynamic(() => import('./routes/postId').then((m) => ({ default: m.PostId })));
const Shopping = dynamic(() => import('./routes/shopping').then((m) => ({ default: m.Shopping })));

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
  const { isAuthenticated } = useAuth();
  const { routeName } = params;

  const business = useBusiness();
  const shopping = useShopping();

  ////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!routeName) return;

    business.onFetch({ routeName });

    return () => {
      business.onReset();
    };
  }, [routeName]);

  ////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!routeName) return;

    if (isAuthenticated) {
      shopping.onFetch({ routeName });
    } else {
      shopping.onReset();
    }

    return () => {
      shopping.onReset();
    };
  }, [routeName, isAuthenticated]);
  ////////////////////////////////////////////////////////////////////////////////////

  if (!routeName || !business) return <></>;

  return (
    <Routes>
      <Route path="/" element={<Home routeName={routeName} />} />

      <Route path="about-us" element={<AboutUs routeName={routeName} />} />

      <Route path="shopping/*" element={<Shopping routeName={routeName} />} />

      <Route path=":postId" element={<PostId routeName={routeName} />} />
    </Routes>
  );
};
