import { useEffect, useState } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonShowHideProps } from 'components/icon-button-show-hide';

import { useUpdateManyUserPosts } from 'features/api/useUpdateManyUserPosts';
import { useModal } from 'features/modal';

import { FetchStatus, OnRefresh } from 'types/api';
import { Post } from 'types/post';
import { cn, isEmpty } from 'utils/general';

export interface HiddenPostControl {
  onGetHiddenButtonProp: (post: Post) => IconButtonShowHideProps;
  onGetHiddenTableRowStyles: (post: Post) => string;
  submitBtn: React.ReactNode;
  hasChange: boolean;
  onRefresh: OnRefresh;
}

export const useHiddenPostControl = ({
  onRefresh,
  fetchStatus,
}: {
  onRefresh: OnRefresh;
  fetchStatus: FetchStatus;
}): HiddenPostControl => {
  const [state, setState] = useState<Record<string, boolean>>({});
  const { pushModal } = useModal();
  const hasChange = !isEmpty(state);

  const { updateManyUserPosts } = useUpdateManyUserPosts();

  useEffect(() => {
    setState({});
  }, [fetchStatus.isSuccess]);

  const handleRefresh = () => {
    if (!hasChange) {
      return onRefresh();
    }

    pushModal('Confirmation', {
      useProps: () => {
        const { onClose } = useModal();

        return {
          className: 'max-w-lg',
          content:
            'Seguro que desea actualizar la tabla?. Serán perdidos todos los cambios hechos hasta el momento',
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              label="Actualizar"
              onClick={() => {
                onRefresh();
                onClose();
              }}
            />
          ),
        };
      },
    });
  };

  const handleSubmit = () => {
    if (isEmpty(state)) return;

    updateManyUserPosts.fetch(
      Object.entries(state).map(([key, value]) => ({
        id: key,
        hidden: value,
      })),
      {
        onAfterSuccess: () => {
          onRefresh();
          setState({});
        },
      },
    );
  };

  const isHidden = ({ hidden, _id }: Post): boolean => {
    return state[_id] !== undefined ? !!state[_id] : !!hidden;
  };

  return {
    onRefresh: handleRefresh,
    submitBtn: hasChange && (
      <Button label="Guardar" onClick={handleSubmit} isBusy={updateManyUserPosts.status.isBusy} />
    ),
    hasChange,
    onGetHiddenButtonProp: (post: Post) => {
      const { _id, hidden } = post;

      return {
        hidden: isHidden(post),
        onClick: () => {
          const newState = { ...state };
          if (newState[_id] === undefined) {
            newState[_id] = !hidden;
          } else {
            delete newState[_id];
          }

          setState(newState);
        },
      };
    },
    onGetHiddenTableRowStyles: (post: Post) => {
      return cn({
        'bg-gray-100 text-gray-400': isHidden(post),
      });
    },
  };
};
