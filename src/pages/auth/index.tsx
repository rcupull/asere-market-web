import { Route, Routes } from 'react-router-dom';

import { dynamic } from 'utils/makeLazy';
const Home = dynamic(() => import('./routes/home').then((m) => ({ default: m.Home })));
const SignIn = dynamic(() => import('./routes/sign-in').then((m) => ({ default: m.SignIn })));
const SignUp = dynamic(() => import('./routes/sign-up').then((m) => ({ default: m.SignUp })));
const ValidateAccount = dynamic(() => import('./routes/validate-account').then((m) => ({ default: m.ValidateAccount })));

export const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="validate-account" element={<ValidateAccount />} />
    </Routes>
  );
};
