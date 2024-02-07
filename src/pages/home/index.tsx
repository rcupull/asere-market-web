import { HeroSectionCentered } from 'components/hero-section-centered';

import { LayoutSingle } from 'pages/@common/layout-single';
import { ModulePosts } from 'pages/@common/module-posts';

export const Home = () => {
  return (
    <LayoutSingle>
      <HeroSectionCentered />
      <ModulePosts title="Recientes" className="w-full" />
    </LayoutSingle>
  );
};
