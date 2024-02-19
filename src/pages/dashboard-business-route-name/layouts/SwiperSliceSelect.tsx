import { ToggleButton } from 'components/toggle-button';

import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SwiperSliceSelectProps extends ChildrenProp, StyleProps {
  onSelect?: () => void;
  selected?: boolean;
  label: string;
}

export const SwiperSliceSelect = ({
  onSelect,
  selected,
  children,
  label,
  className,
}: SwiperSliceSelectProps) => {
  return (
    <div className={cn(className)}>
      <ToggleButton
        interaction="onlyActivate"
        value={selected}
        onChange={() => onSelect?.()}
        className="mb-4"
      />

      <div className="flex justify-center">
        <span className="text-lg">{label}</span>
      </div>
      <div className="overflow-auto !max-h-[35rem]">{children}</div>
    </div>
  );
};
