import { useEffect, useState } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';

import { useAuthSignIn } from 'features/api/useAuthSignIn';
import { useGetOneBusiness } from 'features/api/useGetOneBusiness';

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
  const { authData } = useAuthSignIn();

  const { getOneBusiness } = useGetOneBusiness();

  const isMyBussiness = getOneBusiness?.data?.createdBy === authData?.user?._id;

  useEffect(() => {
    setState(value);
  }, [JSON.stringify(value)]);

  if (!postCategories?.length) {
    if (isMyBussiness) {
      return (
        <div className="flex items-center">
          <Badge variant="warning" />
          <span className="ml-2 font-semibold">
            <span className="text-gray-500 pr-2">Admin:</span>
            Tiene seleccionado el filtro por catagorías pero no tiene categorías visibles en este
            negocio.
          </span>
        </div>
      );
    }

    /**
     * No mostrar nada cuando el usuario no es admin del negocio.
     */
    return <></>;
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
