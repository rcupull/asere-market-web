import { cloneElement } from 'react';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useSales } from 'pages/@hooks/useSales';

export interface PurchaseOrderProps extends StepCommonProps {}

export const PurchaseOrder = ({ nextButton: nextButtonProp, backButton }: PurchaseOrderProps) => {
  const { business } = useBusiness();

  const sales = useSales();

  const nextButton = cloneElement(nextButtonProp, {
    label: 'Crear orden',
    isBusy: sales.status.isBusy,
    onClick: () => {
      if (!business) return;
      sales.onFetch(
        { routeName: business.routeName },
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
