import { HeroSectionCentered } from 'components/hero-section-centered';

import { LayoutPage } from 'pages/@common/layout-page';
import { ModulePosts } from 'pages/@common/module-posts';

export const Home = () => {
  return (
    <LayoutPage>
      <HeroSectionCentered />
      <ModulePosts title="Recientes" className="w-full" />
    </LayoutPage>
  );
};
