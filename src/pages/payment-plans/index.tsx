
import { PlanCompany } from './PlanCompany';
import { PlanFree } from './PlanFree';
import { PlanPrincipiante } from './PlanPrincipiante';
import { PlanProfesional } from './PlanProfesional';

import { LayoutPage } from 'pages/@common/layout-page';

export const PaymentPlans = () => {
  return (
    <LayoutPage title="Precios">
      <div className="flex items-center gap-6 justify-center flex-wrap">
        <PlanFree/>
        <PlanPrincipiante/>
        <PlanProfesional/>
        <PlanCompany/>
      </div>
    </LayoutPage>
  );
};
