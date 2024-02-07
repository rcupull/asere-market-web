import { Navigate, Route, Routes } from 'react-router-dom';

import { withAuthenticatedRoute } from './components/autenticated-route';
import { Layout } from './layout';
import { Dashboard } from './pages/dashboard';
import { SectionBusiness } from './pages/dashboard/sections/business';
import { SectionBusinessId } from './pages/dashboard/sections/business-id';
import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { SignIn } from './pages/sign-in';
import { SignUp } from './pages/sign-up';

import { Business } from 'pages/business';
import { SectionSettings } from 'pages/dashboard/sections/settings';

export const App = (): JSX.Element => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={withAuthenticatedRoute(<Navigate to="/dashboard/business" />, ['user'])}
        />

        <Route
          path="/dashboard/business"
          element={withAuthenticatedRoute(<Dashboard section={<SectionBusiness />} />, ['user'])}
        />

        <Route
          path="/dashboard/business/:businessId"
          element={withAuthenticatedRoute(<Dashboard section={<SectionBusinessId />} />, ['user'])}
        />

        <Route
          path="/dashboard/settings"
          element={withAuthenticatedRoute(<Dashboard section={<SectionSettings />} />, ['user'])}
        />

        <Route path="/:businessId" element={<Business />} />
      </Routes>
    </Layout>
  );
};
