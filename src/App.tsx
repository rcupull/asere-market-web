import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { SignIn } from "./pages/sign-in";
import { Layout } from "./layout";
import { SignUp } from "./pages/sign-up";
import { Dashboard } from "./pages/dashboard";
import { withAuthenticatedRoute } from "./components/autenticated-route";
import { ValidateAccount } from "./pages/validate-account";
import { NotFound } from "./pages/not-found";
import { Admin } from "./pages/admin";

export const App = (): JSX.Element => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/validate-account" element={<ValidateAccount />} />
        <Route
          path="/dashboard"
          element={withAuthenticatedRoute(<Dashboard />, ["user"])}
        />
        <Route
          path="/admin"
          element={withAuthenticatedRoute(<Admin />, ["admin"])}
        />
      </Routes>
    </Layout>
  );
};
