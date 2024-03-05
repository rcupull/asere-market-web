import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'components/button';

import { useDebouncer } from 'hooks/useDebouncer';

import { PostCategory } from 'types/business';
import { StyleProps } from 'types/general';
import { addStringToUniqueArray, cn, removeStringFromArray } from 'utils/general';

export interface PostCategoriesFilterButtonsProps extends StyleProps {
  onChange?: (values: Array<string>) => void;
  value?: Array<string>;
  postCategories?: Array<PostCategory>;
  excluding?: boolean;
  debounceDelay?: number;
  type?: 'wrapped' | 'scrollable';
}

export const PostCategoriesFilterButtons = ({
  onChange,
  className,
  value,
  postCategories,
  excluding,
  type,
  debounceDelay = 0,
}: PostCategoriesFilterButtonsProps) => {
  const debouncer = useDebouncer();
  const [state, setState] = useState<Array<string>>();

  useEffect(() => {
    setState(value);
  }, [JSON.stringify(value)]);

  if (!postCategories?.length) {
    return (
      <Link to="/">
        Tiene seleccionado el filtro por catagorías pero no tiene categorias visibles en este
        negocio. Click en este link para agregar las primeras
      </Link>
    );
  }

  return (
    <div
      className={cn(
        'flex w-full gap-3',
        {
          'flex-wrap': type === 'wrapped',
          'overflow-x-auto max-h-full': type === 'scrollable',
        },
        className,
      )}
    >
      {postCategories.map(({ label, tag }, index) => {
        const selected = state && state.includes(tag);

        return (
          <Button
            key={index}
            variant={selected ? 'primary' : 'outlined'}
            onClick={(e) => {
              e.preventDefault();

              const getNewState = () => {
                if (excluding) {
                  return selected ? [] : [tag];
                }

                return selected
                  ? removeStringFromArray(state, tag)
                  : addStringToUniqueArray(state || [], tag);
              };

              const newState = getNewState();
              setState(newState);
              debouncer(() => onChange?.(newState), debounceDelay);
            }}
            label={label}
          />
        );
      })}
    </div>
  );
};
