import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove ';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { IconButtonView } from 'components/icon-button-view';

import { useUserPostsApi } from 'features/api/useUserPostsApi';
import { useModal } from 'features/modal';
import { useRouter } from 'features/router';

import { HiddenPostControl } from 'hooks/useHiddenPostsControl';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Post } from 'types/post';
import { getPostRoute } from 'utils/business';

export interface RowActionsProps {
  rowData: Post;
  routeName: string;
  onRefresh: () => void;
  hiddenPostControl: HiddenPostControl;
}
export const RowActions = ({
  rowData,
  onRefresh,
  routeName,
  hiddenPostControl,
}: RowActionsProps) => {
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  const handleDelete = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const { removeOneUserPost } = useUserPostsApi();
        const { onClose } = useModal();

        return {
          content: 'Seguro que desea eliminar este post?',
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              isBusy={removeOneUserPost.status.isBusy}
              onClick={() =>
                removeOneUserPost.fetch(
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
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
      <IconButtonView
        stopPropagation
        onClick={() => pushRoute(getPostRoute({ routeName, postId: rowData._id }))}
      />
      <IconButtonShowHide {...hiddenPostControl.onGetHiddenButtonProp(rowData)} />
    </RowActionsContainer>
  );
};
