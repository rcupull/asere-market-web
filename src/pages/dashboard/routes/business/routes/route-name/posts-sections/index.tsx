import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';

import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';
import { useTableCellCategoriesTags } from 'pages/@hooks/useTableCellCategoriesTags';
import { Business, PostsLayoutSection } from 'types/business';

export interface PostsSectionsProps {
  business: Business;
  onRefresh: () => void;
}

export const PostsSections = ({ business, onRefresh }: PostsSectionsProps) => {
  const businessOwnerData = useBusinessOwnerData();
  const { pushModal } = useModal();
  const { routeName } = business;

  const refeshId = 'dashboard_business_routeName_postsSections_OnRefresh';
  useCallFromAfar(refeshId, onRefresh);

  const data = businessOwnerData.data?.layouts?.posts?.sections || null;

  const tableCellCategoriesTags = useTableCellCategoriesTags({
    business,
  });

  return (
    <>
      <TopActions>
        <ButtonNew
          label="Nueva sección"
          onClick={() =>
            pushModal('PostsSectionNew', {
              routeName,
              callAfarResources: refeshId,
            })
          }
          className="ml-auto"
        />

        <ButtonRefresh
          onClick={() => businessOwnerData.onFetch({ routeName })}
          isBusy={businessOwnerData.status.isBusy}
        />
      </TopActions>
      <Table<PostsLayoutSection>
        heads={[null, 'Nombre', 'Categorías', 'Búsqueda']}
        getRowProps={(rowData) => {
          const { name, postCategoriesTags, hiddenName, searchLayout } = rowData;

          return {
            nodes: [
              <RowActions
                key="RowActions"
                rowData={rowData}
                routeName={routeName}
                callAfarResources={refeshId}
              />,
              <div key={name} className="flex items-center">
                {name}
                {hiddenName && <span className="text-red-500 ml-2">(oculto)</span>}
              </div>,
              tableCellCategoriesTags.onGetTableCellNode({ postCategoriesTags }),
              searchLayout,
            ],
          };
        }}
        data={data}
      />
    </>
  );
};
