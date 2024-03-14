import { ToggleButton } from 'components/toggle-button';

import { ChildrenProp, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SwiperSliceSelectProps extends ChildrenProp, StyleProps {
  onSelect?: () => void;
  selected?: boolean;
  label: React.ReactNode;
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
      <div className="flex justify-center">
        <ToggleButton
          interaction="onlyActivate"
          value={selected}
          onChange={() => onSelect?.()}
          className="my-4"
        />
      </div>

      <div className="flex justify-center">
        <div className="text-lg">{label}</div>
      </div>
      <div className="overflow-auto !max-h-[35rem]">{children}</div>
    </div>
  );
};
