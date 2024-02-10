import { PostCurrency } from 'types/post';

export interface ProductPrice1Props {
  price?: number;
  currency?: PostCurrency;
}

export const ProductPrice1 = ({ currency, price }: ProductPrice1Props) => {
  return (
    <div className="text-3xl tracking-tight text-gray-900">
      {price}
      <span className="text-lg ml-2">{currency}</span>
    </div>
  );
};
