import { Button } from 'components/button';

import { useModal } from 'features/modal/useModal';

import { ResourceLayout } from './ResourceLayout';

import { Business } from 'types/business';

export interface ResourcesProps {
  business: Business;
}

export const Resources = ({ business }: ResourcesProps) => {
  const { routeName } = business;
  const { pushModal } = useModal();

  return (
    <>
      <ResourceLayout
        title="Banner"
        description={
          <div>
            Los anuncios de banner pueden ser anuncios estáticos o dinámicos que se posicionan
            estratégicamente en un sitio web para captar la atención de los consumidores. A través
            de la publicidad de banner, las marcas pueden promocionar su marca así como alentar a
            los espectadores a visitar otros sitios web de interés.{' '}
            <a
              className="hyperlink"
              href="https://advertising.amazon.com/es-mx/library/guides/banner-advertising"
            >
              En este enlace
            </a>{' '}
            puedes encontrar más información relacionada con la correcta utilización de los banners
            publicitarios.
          </div>
        }
        action={
          <Button label="Editar" onClick={() => pushModal('UpdateBusinessBanner', { routeName })} />
        }
      />

      <ResourceLayout
        title="Logo"
        description="El logo del negocio"
        action={
          <Button label="Editar" onClick={() => pushModal('UpdateBusinessLogo', { routeName })} />
        }
      />

      <ResourceLayout
        title="Categorías"
        description="Las categorías permiten clasificar facilmente las publicaciones por grupos predefinidos"
        action={
          <Button label="Editar" onClick={() => pushModal('UpdatePostCategories', { routeName })} />
        }
      />
    </>
  );
};
