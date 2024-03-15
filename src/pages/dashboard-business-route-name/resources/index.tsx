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
        description="El logo o logotipo un punto de identificación para tu negocio y es el símbolo utilizado para reconocerla. Te separa de la competencia y es el medio para transmitir tus valores y mostrar a los consumidores por qué no eres como tus competidores."
        action={
          <Button label="Editar" onClick={() => pushModal('UpdateBusinessLogo', { routeName })} />
        }
      />

      <ResourceLayout
        title="Categorías"
        description="Las categorías permiten clasificar fácilmente las publicaciones por grupos predefinidos. Puedes crear, editar o eliminar categorías. Cada publicacion puede estar asociada a una o varias categorías. En la página de tu negocio, se podrá filtrar tus publicaciones por categorías muy facilmente."
        action={
          <Button label="Editar" onClick={() => pushModal('UpdatePostCategories', { routeName })} />
        }
      />

      <ResourceLayout
        title="Redes sociales"
        description="Configure los link de las redes sociales de su negocio."
        action={
          <Button label="Editar" onClick={() => pushModal('UpdateSocialNetworks', { routeName })} />
        }
      />

      <ResourceLayout
        title="Mi página de presentación"
        description="Mediante su página de presentación usted puede indentificar su tienda para que sus clientes conozcan sobre sus ventas y demás(TODO)"
        action={
          <Button
            label="Editar"
            onClick={() => pushModal('UpdateBusinessAboutUs', { routeName })}
          />
        }
      />
    </>
  );
};
