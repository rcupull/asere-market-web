import { HeroSectionCentered } from 'components/hero-section-centered';

import { ModulePosts } from 'pages/@common/module-posts';

export const Home = () => {
  return (
    <main className="flex flex-col items-center px-32">
      <HeroSectionCentered />
      <ModulePosts title="Recientes" className="w-full" />
    </main>
  );
};
