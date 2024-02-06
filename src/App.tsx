import { Navigate, Route, Routes } from 'react-router-dom';

import { withAuthenticatedRoute } from './components/autenticated-route';
import { Layout } from './layout';
import { Dashboard } from './pages/dashboard';
import { SectionBusiness } from './pages/dashboard/sections/business';
import { SectionBusinessSelected } from './pages/dashboard/sections/business-selected';
import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { SignIn } from './pages/sign-in';
import { SignUp } from './pages/sign-up';

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
          element={withAuthenticatedRoute(<Dashboard section={<SectionBusinessSelected />} />, [
            'user',
          ])}
        />
      </Routes>
    </Layout>
  );
};
