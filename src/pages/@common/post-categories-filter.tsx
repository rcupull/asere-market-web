import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'components/button';

import { useDebouncer } from 'hooks/useDebouncer';

import { PostCategory } from 'types/business';
import { StyleProps } from 'types/general';
import { addStringToUniqueArray, cn, removeStringFromArray } from 'utils/general';

export interface PostCategoriesFilterProps extends StyleProps {
  onChange?: (values: Array<string>) => void;
  value?: Array<string>;
  postCategories?: Array<PostCategory>;
}

export const PostCategoriesFilter = ({
  onChange,
  className,
  value,
  postCategories,
}: PostCategoriesFilterProps) => {
  const debouncer = useDebouncer();
  const [state, setState] = useState<Array<string>>();


  useEffect(()=>{
    setState(value)
  },[JSON.stringify(value)]);

  if (!postCategories?.length) {
    return (
      <Link to="/">
        Tiene seleccionado el filtro por catagorías pero no tiene categorias visibles en este
        negocio. Click en este link para agregar las primeras
      </Link>
    );
  }

  return (
    <div className={cn('flex flex-wrap w-full gap-3', className)}>
      {postCategories.map(({ label, tag }, index) => {
        const selected = state && state.includes(tag);

        return (
          <Button
            key={index}
            variant={selected ? 'primary' : 'outlined'}
            onClick={() => {
              const newState = selected
                ? removeStringFromArray(state, tag)
                : addStringToUniqueArray(state || [], tag);

                setState(newState);

              debouncer(() => onChange?.(newState), 1000);
            }}
            label={label}
          />
        );
      })}
    </div>
  );
};
