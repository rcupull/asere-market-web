import { Tabs } from 'components/tabs';

import { LayoutPostCardImages } from './layouts-post-card-images';
import { LayoutSelectProps } from './types';


export interface LayoutPostCardProps extends LayoutSelectProps {}

export const LayoutPostCard = ({ onChange, value }: LayoutPostCardProps) => {
  return (
    <Tabs
      items={[
        {
          label: 'Imágenes',
          content: <LayoutPostCardImages value={value} onChange={onChange} />,
        },
      ]}
    />
  );
};
