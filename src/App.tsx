import { Navigate, Route, Routes } from 'react-router-dom';

import { useInit } from 'hooks/useInit';

import { withAuthenticatedRoute } from './components/autenticated-route';

import { LayoutMain } from 'pages/@common/layout-main';
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
const DashboardSettings = dynamic(() =>
  import('pages/dashboard-settings').then((m) => ({
    default: m.DashboardSettings,
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
    <LayoutMain>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/validate-account" element={<ValidateAccount />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* ////////////////////////////////////////////// */}

        <Route path="/payment-plans" element={<PaymentPlans />} />

        <Route
          path="/payment-plans/purchase"
          element={withAuthenticatedRoute(<PaymentPlansPurchase />, ['user'])}
        />

        {/* ////////////////////////////////////////////// */}
        <Route
          path="/dashboard"
          element={withAuthenticatedRoute(<Navigate to="/dashboard/business" />, ['user'])}
        />

        <Route
          path="/dashboard/business"
          element={withAuthenticatedRoute(<DashboardBusiness />, ['user'])}
        />

        <Route
          path="/dashboard/business/:routeName"
          element={withAuthenticatedRoute(<DashboardBusinessRouteName />, ['user'])}
        />

        <Route
          path="/dashboard/settings"
          element={withAuthenticatedRoute(<DashboardSettings />, ['user'])}
        />

        <Route path="/business" element={<Business />} />

        <Route path="/:routeName" element={<BusinessRouteName />} />

        <Route path="/:routeName/:postId" element={<BusinessRouteNamePostId />} />
      </Routes>
    </LayoutMain>
  );
};
