import { useEffect } from 'react';

import { Table } from 'components/table';

import { usePostsApi } from 'features/post/api';

import { RowActions } from './RowActions';

export interface TablePostsProps {
  businessId: string;
}

export const TabelPosts = ({ businessId }: TablePostsProps) => {
  const posts = usePostsApi();

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => posts.getAll.fetch({ businessId });

  return (
    <Table
      heads={[
        null,
        'Nombre',
        'Descripión',
        'Moneda',
        'Precio',
        'Disponibilidad',
        'Fecha de Creación',
      ]}
      getRowProps={(rowData) => {
        const { name, createdAt, description, currency, price, amountAvailable } = rowData;

        return {
          nodes: [
            <RowActions key="RowActions" rowData={rowData} onRefresh={onRefresh} />,
            name,
            description,
            currency,
            price,
            amountAvailable,
            createdAt,
          ],
        };
      }}
      data={posts.getAll.data}
    />
  );
};
