import { useState } from 'react';

import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { ButtonRemove } from 'components/button-remove';
import { ButtonSave } from 'components/button-save';
import { FieldCheckbox } from 'components/field-checkbox';
import { IconButtonOptionsBars } from 'components/icon-button-options-bars';
import { Menu } from 'components/menu';

import { useDeleteManyBusinessPosts } from 'features/api/useDeleteManyBusinessPosts';
import { useUpdateManyBusinessPosts } from 'features/api/useUpdateManyBusinessPosts';
import { useModal } from 'features/modal/useModal';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { removeRow } from 'utils/general';

type Action = 'delete' | 'hide' | 'show';

export interface BulkActionsProps extends StyleProps {
  business: Business | null;
  onRefresh: () => void;
  children: (args: {
    getBulkRowNodes: (
      args: {
        rowData: Post;
      },
      nodes: Array<React.ReactNode>,
    ) => Array<React.ReactNode>;
    getBulkHeaderNodes: (nodes: Array<React.ReactNode>) => Array<React.ReactNode>;
    getBulkTopActionsNode: (node: React.ReactNode) => React.ReactNode;
  }) => React.ReactNode;
}

export const BulkActions = ({ business, children, onRefresh }: BulkActionsProps) => {
  const [action, setAction] = useState<Action>();
  const [selectedPosts, setSelectedPosts] = useState<Array<Post>>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);

  const selecting = action !== undefined;
  const enableAction = selectedAll || selectedPosts.length > 0;

  const { pushModal } = useModal();

  if (!business) return <></>;

  const { routeName } = business;

  const getActionLabel = (action: Action): string => {
    const labels: Record<Action, string> = {
      delete: 'Eliminar publicaciones',
      hide: 'Ocultar publicaciones',
      show: 'Mostrar publicaciones',
    };

    return labels[action];
  };

  const onAfterSuccessMain = () => {
    onRefresh();
    setSelectedAll(false);
    setSelectedPosts([]);
    setAction(undefined);
  };

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { deleteManyBusinessPosts } = useDeleteManyBusinessPosts();
          const { onClose } = useModal();
          return {
            content: (
              <div>
                <span>
                  Al eliminar estas publicaciones seran borradas todas las imágenes y datos
                  asociados a las mismas de manera <span className="font-bold">permanente</span>.
                  Seguro que desea eliminar estas publicaciones?
                </span>
              </div>
            ),
            badge: <Badge variant="error" />,
            primaryBtn: (
              <ButtonRemove
                isBusy={deleteManyBusinessPosts.status.isBusy}
                onClick={() => {
                  const onAfterSuccess = () => {
                    onClose();
                    onAfterSuccessMain();
                  };

                  if (selectedAll) {
                    return deleteManyBusinessPosts.fetch(
                      { routeName, all: true },
                      { onAfterSuccess },
                    );
                  }

                  if (selectedPosts.length > 0) {
                    return deleteManyBusinessPosts.fetch(
                      { routeName, ids: selectedPosts.map((p) => p._id) },
                      { onAfterSuccess },
                    );
                  }
                }}
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const handleShowHide = (hidden: boolean) => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { updateManyBusinessPosts } = useUpdateManyBusinessPosts();
          const { onClose } = useModal();
          return {
            content: (
              <div>
                <span>
                  Al {`${hidden ? 'ocultar' : 'mostrar'}`} no se perderá ningun dato delas mismas.
                  Solo se controla la visibilidad en la página de su negocio Seguro que desea{' '}
                  {`${hidden ? 'ocultar' : 'mostrar'}`} estas publicaciones?
                </span>
              </div>
            ),
            badge: <Badge variant="warning" />,
            primaryBtn: (
              <ButtonSave
                isBusy={updateManyBusinessPosts.status.isBusy}
                label={hidden ? 'Ocultar' : 'Mostrar'}
                onClick={() => {
                  const onAfterSuccess = () => {
                    onClose();
                    onAfterSuccessMain();
                  };

                  if (selectedAll) {
                    return updateManyBusinessPosts.fetch(
                      { routeName, all: true, update: { hidden } },
                      { onAfterSuccess },
                    );
                  }

                  if (selectedPosts.length > 0) {
                    return updateManyBusinessPosts.fetch(
                      { routeName, ids: selectedPosts.map((p) => p._id), update: { hidden } },
                      { onAfterSuccess },
                    );
                  }
                }}
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const getActionEvent = (action: Action) => {
    const events: Record<Action, () => void> = {
      delete: handleDelete,
      hide: () => handleShowHide(true),
      show: () => handleShowHide(false),
    };

    return events[action];
  };

  const menuNode = (
    <div className="flex items-center gap-2">
      {selecting ? (
        <>
          <Button
            variant="outlined"
            label="Cancelar acción"
            onClick={() => {
              setSelectedAll(false);
              setSelectedPosts([]);
              setAction(undefined);
            }}
          />
          {enableAction && (
            <Button
              variant="outlined"
              label={getActionLabel(action)}
              onClick={getActionEvent(action)}
            />
          )}
        </>
      ) : (
        <Menu
          buttonElement={
            <div className="flex items-center">
              <IconButtonOptionsBars />
              <span className="ml-2"> Acciones múltiples</span>
            </div>
          }
          items={[
            {
              label: 'Eliminar',
              onClick: () => setAction('delete'),
            },
            {
              label: 'Ocultar',
              onClick: () => setAction('hide'),
            },
            {
              label: 'Mostrar',
              onClick: () => setAction('show'),
            },
          ]}
        />
      )}
    </div>
  );

  const isEqualPosts = (a: Post, b: Post) => a._id === b._id;
  const isSelected = (post: Post) =>
    !!selectedPosts.find((p) => isEqualPosts(post, p)) || selectedAll;
  const getIndex = (post: Post) => selectedPosts.findIndex((p) => isEqualPosts(post, p));

  return (
    <>
      {children({
        getBulkTopActionsNode: (node) => {
          return (
            <div className="flex items-center">
              {menuNode}
              <div className="ml-auto relative">
                {node}
                {selecting && (
                  <div className="absolute inset-0 bg-white opacity-60 rounded-md cursor-not-allowed" />
                )}
              </div>
            </div>
          );
        },
        getBulkHeaderNodes: (nodes) => {
          if (!selecting) return nodes;

          return [
            <FieldCheckbox
              key="checkbox"
              noUseFormik
              value={selectedAll}
              onChange={(e) => {
                setSelectedPosts([]);
                setSelectedAll(e.target.checked);
              }}
              label={<span className="text-nowrap -mr-[20rem]">Todos</span>}
            />,
            ...nodes,
          ];
        },
        getBulkRowNodes: ({ rowData }, nodes) => {
          if (!selecting) return nodes;

          return [
            <FieldCheckbox
              key="checkbox"
              noUseFormik
              value={isSelected(rowData)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedPosts([...selectedPosts, rowData]);
                } else {
                  setSelectedPosts(removeRow(selectedPosts, getIndex(rowData)));
                }
              }}
            />,
            ...nodes.map((node, index) => (
              <div key={index} className="relative">
                {node}
                <div className="absolute inset-0 bg-white opacity-60 rounded-md cursor-not-allowed" />
              </div>
            )),
          ];
        },
      })}
    </>
  );
};
