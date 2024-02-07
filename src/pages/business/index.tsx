import { useParams } from 'react-router-dom';

import { LayoutSingle } from 'pages/@common/layout-single';
import { ModulePosts } from 'pages/@common/module-posts';

export const Business = () => {
  const { businessId } = useParams();

  if (!businessId) return <></>;

  return (
    <LayoutSingle>
      <ModulePosts title="Recientes" businessIds={[businessId]} className="w-full" />
    </LayoutSingle>
  );
};
