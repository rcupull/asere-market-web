import { Navigate, Route, Routes } from 'react-router-dom';

import { withAuthenticatedRoute } from './components/autenticated-route';
import { Layout } from './layout';
import { Dashboard } from './pages/dashboard';
import { DashboardBusiness } from './pages/dashboard/components/dashboard-business';
import { DashboardBusinessRouteName } from './pages/dashboard/components/dashboard-business-route-name';
import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { SignIn } from './pages/sign-in';
import { SignUp } from './pages/sign-up';

import { AboutUs } from 'pages/about-us';
import { Business } from 'pages/business';
import { BusinessRouteName } from 'pages/business-route-name';
import { BusinessRouteNamePostId } from 'pages/business-route-name-postId';
import { DashboardSettings } from 'pages/dashboard/components/dashboard-settings';
import { Price } from 'pages/price';
import { ValidateAccount } from 'pages/validate-account';

export const App = (): JSX.Element => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/validate-account" element={<ValidateAccount />} />
        <Route path="/price" element={<Price />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/dashboard"
          element={withAuthenticatedRoute(<Navigate to="/dashboard/business" />, ['user'])}
        />

        <Route
          path="/dashboard/business"
          element={withAuthenticatedRoute(
            <Dashboard>
              <DashboardBusiness />
            </Dashboard>,
            ['user'],
          )}
        />

        <Route
          path="/dashboard/business/:routeName"
          element={withAuthenticatedRoute(
            <Dashboard>
              <DashboardBusinessRouteName />
            </Dashboard>,
            ['user'],
          )}
        />

        <Route
          path="/dashboard/settings"
          element={withAuthenticatedRoute(
            <Dashboard>
              <DashboardSettings />
            </Dashboard>,
            ['user'],
          )}
        />

        <Route path="/business" element={<Business />} />

        <Route path="/:routeName" element={<BusinessRouteName />} />

        <Route path="/:routeName/:postId" element={<BusinessRouteNamePostId />} />
      </Routes>
    </Layout>
  );
};
