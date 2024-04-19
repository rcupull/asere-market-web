import { cloneElement } from 'react';

import { useShoppingMakeOrder } from 'features/api/shopping/useShoppingMakeOrder';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';

import { useShopping } from 'pages/@hooks/useShopping';

export interface PurchaseOrderProps extends StepCommonProps {}

export const PurchaseOrder = ({ nextButton: nextButtonProp, backButton }: PurchaseOrderProps) => {
  const { shoppingMakeOrder } = useShoppingMakeOrder();
  const shopping = useShopping();

  const nextButton = cloneElement(nextButtonProp, {
    label: 'Crear orden',
    isBusy: shoppingMakeOrder.status.isBusy,
    onClick: () => {
      if (!shopping.currentShopping) return;

      const { _id: shoppingId } = shopping.currentShopping;

      shoppingMakeOrder.fetch(
        { shoppingId },
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
