import { Tabs } from 'components/tabs';

import { LayoutSelectProps } from '../types';
import { LayoutPostCardDiscount } from './layouts-post-card-discount';
import { LayoutPostCardImages } from './layouts-post-card-images';
import { LayoutPostCardName } from './layouts-post-card-name';
import { LayoutPostCardPrice } from './layouts-post-card-price';


export interface LayoutPostCardProps extends LayoutSelectProps {}

export const LayoutPostCard = ({ onChange, value }: LayoutPostCardProps) => {
  return (
    <Tabs
      items={[
        {
          label: 'Imágenes',
          content: <LayoutPostCardImages value={value} onChange={onChange} />,
        },
        {
          label: 'Nombre',
          content: <LayoutPostCardName value={value} onChange={onChange} />,
        },
        {
          label: 'Precio',
          content: <LayoutPostCardPrice value={value} onChange={onChange} />,
        },
        {
          label: 'Descuento',
          content: <LayoutPostCardDiscount value={value} onChange={onChange} />,
        },
      ]}
    />
  );
};
