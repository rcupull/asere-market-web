import { cloneElement } from 'react';

import { useSaleMakeOrder } from 'features/api/sales/useSaleMakeOrder';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';

import { useSales } from 'pages/@hooks/useSales';

export interface PurchaseOrderProps extends StepCommonProps {}

export const PurchaseOrder = ({ nextButton: nextButtonProp, backButton }: PurchaseOrderProps) => {
  const { saleMakeOrder } = useSaleMakeOrder();
  const sales = useSales();

  const nextButton = cloneElement(nextButtonProp, {
    label: 'Crear orden',
    isBusy: saleMakeOrder.status.isBusy,
    onClick: () => {
      if (!sales.currentSale) return;

      const { _id: saleId } = sales.currentSale;

      saleMakeOrder.fetch(
        { saleId },
        {
          onAfterSuccess: () => {
            nextButtonProp.props.onClick();
          },
        },
      );
    },
  });

  return (
    <>
      <div className="flex flex-col items-center px-20">Generar Orden</div>

      <ButtonNavContainer leftButton={backButton} rightButton={nextButton} />
    </>
  );
};
