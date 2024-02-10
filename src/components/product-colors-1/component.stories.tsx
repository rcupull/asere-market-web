import { ProductColors1 } from '.';

export default {
  component: ProductColors1,
};

export const Default = (): JSX.Element => (
  <ProductColors1
    items={[
      { name: 'White', bgColor: 'bg-white', selectedRingColor: 'ring-gray-400' },
      { name: 'Gray', bgColor: 'bg-gray-200', selectedRingColor: 'ring-gray-400' },
      { name: 'Black', bgColor: 'bg-gray-900', selectedRingColor: 'ring-gray-900' },
    ]}
  />
);
