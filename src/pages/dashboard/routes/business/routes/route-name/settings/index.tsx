import { Button } from 'components/button';

import { SettingsLayout } from './SettingsLayout';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdateAboutUs } from 'pages/@modals/useBusinessUpdateAboutUs';
import { useBusinessUpdateBanner } from 'pages/@modals/useBusinessUpdateBanner';
import { useBusinessUpdateInfo } from 'pages/@modals/useBusinessUpdateInfo';
import { useBusinessUpdateLogo } from 'pages/@modals/useBusinessUpdateLogo';
import { useBusinessUpdatePostCategories } from 'pages/@modals/useBusinessUpdatePostCategories';

export interface SettingsProps {
  routeName: string;
}

export const Settings = ({ routeName }: SettingsProps) => {
  const businessUpdateInfo = useBusinessUpdateInfo();
  const businessUpdateBanner = useBusinessUpdateBanner();
  const businessUpdateAboutUs = useBusinessUpdateAboutUs();
  const businessUpdateLogo = useBusinessUpdateLogo();
  const businessUpdatePostCategories = useBusinessUpdatePostCategories();

  const { onFetch, business } = useBusiness();

  return (
    <>
      <SettingsLayout
        title="Informaciones básicas"
        description="Configure los link de las redes sociales de su negocio, contacto de whatsapp y demás."
        action={
          <Button
            label="Editar"
            onClick={() =>
              businessUpdateInfo.open({
                onAfterSuccess: () => business && onFetch({ routeName: business?.routeName }),
              })
            }
          />
        }
      />

      <SettingsLayout
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
        action={<Button label="Editar" onClick={() => businessUpdateBanner.open()} />}
      />

      <SettingsLayout
        title="Logo"
        description="El logo o logotipo un punto de identificación para tu negocio y es el símbolo utilizado para reconocerla. Te separa de la competencia y es el medio para transmitir tus valores y mostrar a los consumidores por qué no eres como tus competidores."
        action={<Button label="Editar" onClick={() => businessUpdateLogo.open({ routeName })} />}
      />

      <SettingsLayout
        title="Categorías"
        description="Las categorías permiten clasificar fácilmente las publicaciones por grupos predefinidos. Puedes crear, editar o eliminar categorías. Cada publicacion puede estar asociada a una o varias categorías. En la página de tu negocio, se podrá filtrar tus publicaciones por categorías muy facilmente."
        action={
          <Button label="Editar" onClick={() => businessUpdatePostCategories.open({ routeName })} />
        }
      />

      <SettingsLayout
        title="Sobre mi negocio"
        description="Mediante su página de presentación usted puede indentificar su tienda para que sus clientes conozcan sobre sus ventas y demás(TODO)"
        action={<Button label="Editar" onClick={() => businessUpdateAboutUs.open()} />}
      />
    </>
  );
};
