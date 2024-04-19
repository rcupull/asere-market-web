import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from 'features/api-slices/useAuth';

import { getBusinessRoute } from 'utils/business';
import { dynamic } from 'utils/makeLazy';
const Home = dynamic(() => import('./routes/home').then((m) => ({ default: m.Home })));
const SaleId = dynamic(() => import('./routes/saleId').then((m) => ({ default: m.SaleId })));

export interface SalesProps {
  routeName: string;
}

export const Sales = ({ routeName }: SalesProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={getBusinessRoute({ routeName })} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home routeName={routeName} />} />
      <Route path=":saleId" element={<SaleId />} />
    </Routes>
  );
};
