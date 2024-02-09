import { PricePlanCard } from 'components/price-plan-card';

import { LayoutSingle } from 'pages/@common/layout-single';

export const Price = () => {
  return (
    <LayoutSingle title="Precios">
      <div className="flex items-center gap-6">
        <PricePlanCard
          name="Gratis"
          free
          description="Perfecto para los que estan comenzando en el mundo del negocio"
          price={0}
          items={[
            {
              description: '5 products',
              included: true,
            },
            {
              description: 'Up to 1,000 subscribers',
              included: true,
            },
            {
              description: 'Basic analytics',
              included: true,
            },
            {
              description: '48-hour support response time',
              included: true,
            },
            {
              description: 'Phone & email support',
              included: false,
            },
            {
              description: 'Custom reporting tools',
              included: false,
            },
          ]}
        />

        <PricePlanCard
          name="Principiante"
          popular
          description="Perfecto para los que estan comenzando en el mundo del negocio"
          price={200}
          items={[
            {
              description: '5 products',
              included: true,
            },
            {
              description: 'Up to 1,000 subscribers',
              included: true,
            },
            {
              description: 'Basic analytics',
              included: true,
            },
            {
              description: '48-hour support response time',
              included: true,
            },
            {
              description: 'Phone & email support',
              included: false,
            },
            {
              description: 'Custom reporting tools',
              included: false,
            },
          ]}
        />

        <PricePlanCard
          name="Profesional"
          description="Perfecto para los que estan comenzando en el mundo del negocio"
          price={500}
          items={[
            {
              description: '5 products',
              included: true,
            },
            {
              description: 'Up to 1,000 subscribers',
              included: true,
            },
            {
              description: 'Basic analytics',
              included: true,
            },
            {
              description: '48-hour support response time',
              included: true,
            },
            {
              description: 'Phone & email support',
              included: false,
            },
            {
              description: 'Custom reporting tools',
              included: false,
            },
          ]}
        />
      </div>
    </LayoutSingle>
  );
};
