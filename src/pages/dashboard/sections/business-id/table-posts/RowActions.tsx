import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove ';

import { useModal } from 'features/modal';
import { usePostsApi } from 'features/post/api';

import { Post } from 'types/post';

export interface RowActionsProps {
  rowData: Post;
  onRefresh: () => void;
}
export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { pushModal } = useModal();

  const handleDelete = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const postsApi = usePostsApi();
        const { onClose } = useModal();

        return {
          content: 'Seguro que desea eliminar este post?',
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              isBusy={postsApi.removeOne.status.isBusy}
              onClick={() =>
                postsApi.removeOne.fetch(
                  { id: rowData._id },
                  {
                    onAfterSuccess: () => {
                      onClose();
                      onRefresh();
                    },
                  },
                )
              }
            />
          ),
        };
      },
    });
  };

  return (
    <div>
      <IconButtonRemove onClick={handleDelete} />
    </div>
  );
};
