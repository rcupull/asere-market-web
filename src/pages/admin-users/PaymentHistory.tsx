
import { User } from 'types/auth';

interface PaymentHistoryProps {
  payment: User['payment'];
}

export const PaymentHistory = ({ payment }: PaymentHistoryProps) => {
  const { planHistory } = payment;
  const currentPlan = planHistory[planHistory.length - 1] || {};

  const renderLine = (key: string, value: any) => {
    return (
      <div className="flex justify-between item-center">
        <span className='font-bold text-nowrap'>{`${key}: `}</span>
        <span>{`${value}`}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {renderLine('Plan', currentPlan.planType)}
      {renderLine('Estado', currentPlan.status)}
      {renderLine('Trial', currentPlan.trialMode)}
      {renderLine('Código', currentPlan.validationPurchaseCode || 'Ninguno')}
    </div>
  );
};
