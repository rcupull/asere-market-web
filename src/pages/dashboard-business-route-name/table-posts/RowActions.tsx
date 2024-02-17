import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove ';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { IconButtonUpdate } from 'components/icon-button-update';
import { IconButtonView } from 'components/icon-button-view';

import { useRemoveOneUserPost } from 'features/api/useRemoveOneUserPost';
import { useModal } from 'features/modal/useModal';

import { UpdateId, useCallFromAfar } from 'hooks/useCallFromAfar';
import { HiddenPostControl } from 'hooks/useHiddenPostsControl';
import { useRouter } from 'hooks/useRouter';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Post } from 'types/post';
import { getPostRoute } from 'utils/business';

export interface RowActionsProps {
  rowData: Post;
  routeName: string;
  updateId?: UpdateId;
  hiddenPostControl: HiddenPostControl;
}
export const RowActions = ({
  rowData,
  updateId,
  routeName,
  hiddenPostControl,
}: RowActionsProps) => {
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { removeOneUserPost } = useRemoveOneUserPost();
          const { onClose } = useModal();
          const { onCallAfar } = useCallFromAfar();
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

                        onCallAfar(updateId);
                      },
                    },
                  )
                }
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const handleUpdate = () => {
    pushModal('PostNew', {
      routeName,
      postId: rowData._id,
      updateId,
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
      <IconButtonUpdate onClick={handleUpdate} />
    </RowActionsContainer>
  );
};
