import { useEffect } from 'react';

import { FieldSelect, FieldSelectProps } from 'components/field-select';

import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';

export interface FieldPostsSectionLayoutProps
  extends Omit<
    FieldSelectProps,
    'items' | 'renderOption' | 'renderValue' | 'optionToValue' | 'multi'
  > {
  routeName: string;
}

export const FieldPostsSectionSelect = ({ routeName, ...props }: FieldPostsSectionLayoutProps) => {
  const businessOwnerData = useBusinessOwnerData();

  useEffect(() => {
    businessOwnerData.onFetch({ routeName });
  }, []);

  const sections = businessOwnerData.data?.layouts?.posts?.sections || [];

  return (
    <FieldSelect<{ id: string; name: string }>
      multi
      renderOption={({ name }) => name}
      renderValue={({ name }) => (
        <div className="px-2 mx-0.5 rounded-2xl border border-gray-400">{name}</div>
      )}
      optionToValue={({ id }) => id}
      items={sections.map(({ _id, name }) => ({
        id: _id,
        name,
      }))}
      {...props}
    />
  );
};
