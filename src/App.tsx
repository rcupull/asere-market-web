import { Navigate, Route, Routes } from 'react-router-dom';

import { useInit } from 'hooks/useInit';

import { AuthenticatedUser } from './components/autenticated-user';

import { LayoutMain } from 'pages/@common/layout-main';
import { withPageProviders } from 'pages/@common/with-page-providers';
import { PaymentPlansPurchase } from 'pages/payment-plans-purchase';
import { dynamic } from 'utils/makeLazy';

const Business = dynamic(() => import('pages/business').then((m) => ({ default: m.Business })));
const AboutUs = dynamic(() => import('pages/about-us').then((m) => ({ default: m.AboutUs })));
const BusinessRouteName = dynamic(() =>
  import('pages/business-route-name').then((m) => ({ default: m.BusinessRouteName })),
);
const BusinessRouteNamePostId = dynamic(() =>
  import('pages/business-route-name-postId').then((m) => ({ default: m.BusinessRouteNamePostId })),
);
const Settings = dynamic(() =>
  import('pages/settings').then((m) => ({
    default: m.Settings,
  })),
);
const PaymentPlans = dynamic(() =>
  import('pages/payment-plans').then((m) => ({ default: m.PaymentPlans })),
);
const ValidateAccount = dynamic(() =>
  import('pages/validate-account').then((m) => ({ default: m.ValidateAccount })),
);
const NotFound = dynamic(() => import('pages/not-found').then((m) => ({ default: m.NotFound })));
const SignIn = dynamic(() => import('pages/sign-in').then((m) => ({ default: m.SignIn })));
const SignUp = dynamic(() => import('pages/sign-up').then((m) => ({ default: m.SignUp })));
const Home = dynamic(() => import('pages/home').then((m) => ({ default: m.Home })));
const DashboardBusiness = dynamic(() =>
  import('pages/dashboard-business').then((m) => ({
    default: m.DashboardBusiness,
  })),
);
const DashboardBusinessRouteName = dynamic(() =>
  import('pages/dashboard-business-route-name').then((m) => ({
    default: m.DashboardBusinessRouteName,
  })),
);

export const App = (): JSX.Element => {
  useInit();

  return (
    <Routes>
      <Route path="/" element={withPageProviders(<Home />, LayoutMain)} />
      <Route path="/sign-in" element={withPageProviders(<SignIn />, LayoutMain)} />
      <Route path="/sign-up" element={withPageProviders(<SignUp />, LayoutMain)} />
      <Route path="/not-found" element={withPageProviders(<NotFound />, LayoutMain)} />
      <Route
        path="/validate-account"
        element={withPageProviders(<ValidateAccount />, LayoutMain)}
      />
      <Route path="/about-us" element={withPageProviders(<AboutUs />, LayoutMain)} />

      {/* ////////////////////////////////////////////// */}

      <Route path="/payment-plans" element={withPageProviders(<PaymentPlans />, LayoutMain)} />

      <Route
        path="/payment-plans/purchase"
        element={withPageProviders(<PaymentPlansPurchase />, AuthenticatedUser, LayoutMain)}
      />

      {/* ////////////////////////////////////////////// */}
      <Route
        path="/dashboard"
        element={withPageProviders(
          <Navigate to="/dashboard/business" />,
          AuthenticatedUser,
          LayoutMain,
        )}
      />

      <Route
        path="/dashboard/business"
        element={withPageProviders(<DashboardBusiness />, AuthenticatedUser, LayoutMain)}
      />

      <Route
        path="/dashboard/business/:routeName"
        element={withPageProviders(<DashboardBusinessRouteName />, AuthenticatedUser, LayoutMain)}
      />

      <Route
        path="/settings"
        element={withPageProviders(<Settings />, AuthenticatedUser, LayoutMain)}
      />

      <Route path="/business" element={withPageProviders(<Business />, LayoutMain)} />

      <Route path="/:routeName" element={withPageProviders(<BusinessRouteName />, LayoutMain)} />

      <Route
        path="/:routeName/:postId"
        element={withPageProviders(<BusinessRouteNamePostId />, LayoutMain)}
      />
    </Routes>
  );
};
