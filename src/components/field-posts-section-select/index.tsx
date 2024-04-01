import { useEffect } from 'react';

import { FieldSelect, FieldSelectProps } from 'components/field-select';
import { IconButtonAdd } from 'components/icon-button-add';

import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';

import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';

export interface FieldPostsSectionLayoutProps
  extends Omit<
    FieldSelectProps,
    'items' | 'renderOption' | 'renderValue' | 'optionToValue' | 'multi'
  > {
  routeName: string;
}

export const FieldPostsSectionSelect = ({
  routeName,
  label,
  ...props
}: FieldPostsSectionLayoutProps) => {
  const businessOwnerData = useBusinessOwnerData();
  const { pushModal } = useModal();

  const callAfarResources = 'FieldPostsSectionSelect_businessOwnerData.onRefresh';
  useCallFromAfar(callAfarResources, () => businessOwnerData.onFetch({ routeName }));

  useEffect(() => {
    businessOwnerData.onFetch({ routeName });
  }, []);

  const sections = businessOwnerData.data?.layouts?.posts?.sections || [];

  return (
    <FieldSelect<{ id: string; name: string }>
      label={
        <div className="flex items-center">
          {label}
          <IconButtonAdd
            title="Agregar sección"
            className="text-green-600 font-bold ml-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              pushModal('PostsSectionNew', { routeName, callAfarResources }, { emergent: true });
            }}
          />
        </div>
      }
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
