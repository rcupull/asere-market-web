import { FieldSelect, FieldSelectProps } from 'components/field-select';
import { IconButtonAdd } from 'components/icon-button-add';

import { useBusinessNewUpdateSection } from 'pages/@hooks/useBusinessNewUpdateSection';
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
  const { business } = useBusinessOwnerData();
  const sections = business?.layouts?.posts?.sections || [];
  const businessNewUpdateSection = useBusinessNewUpdateSection();

  return (
    <FieldSelect<{ id: string; name: string }>
      label={
        <div className="flex items-center">
          {label}
          <IconButtonAdd
            title="Agregar nuevo grupo de publicaciones"
            className="text-green-600 font-bold ml-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              businessNewUpdateSection.open({ routeName });
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
