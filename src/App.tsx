import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { SignIn } from "./pages/sign-in";
import { Layout } from "./layout";
import { SignUp } from "./pages/sign-up";
import { Dashboard } from "./pages/dashboard";
import { withAuthenticatedRoute } from "./components/autenticated-route";
import { NotFound } from "./pages/not-found";

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
          element={withAuthenticatedRoute(<Dashboard />, ["user", "admin"])}
        />
        <Route
          path="/dashboard/:section"
          element={withAuthenticatedRoute(<Dashboard />, ["user", "admin"])}
        />
      </Routes>
    </Layout>
  );
};
