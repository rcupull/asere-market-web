import { HtmlTextContainer } from 'components/html-text-container';
import { QrCode } from 'components/qr-code';

import { StepCommonProps } from '../../types';
import { ButtonNavContainer } from '../button-nav-container';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useShopping } from 'pages/@hooks/useShopping';
import { getWhatsAppShoppingLink } from 'utils/business';

export interface WhatsAppMessageProps extends StepCommonProps {}

export const WhatsAppMessage = ({ backButton }: WhatsAppMessageProps) => {
  const { business } = useBusiness();
  const { currentShopping } = useShopping();

  const whatsAppPhoneNumber = business?.whatsAppPhoneNumber;

  if (!whatsAppPhoneNumber) {
    return <>No tiene contacto de Whatsapp</>;
  }

  if (!currentShopping) {
    return <>No tiene una solicitud de venta en construccion</>;
  }

  const whatsappLink = getWhatsAppShoppingLink(whatsAppPhoneNumber, currentShopping);

  return (
    <>
      <div className="flex flex-col items-center px-20">
        <HtmlTextContainer className="w-80">
          <a href={whatsappLink} target="_blank" rel="noreferrer">
            Click en este link
          </a>{' '}
          o use el código desde su teléfono para contactar con nosotros
        </HtmlTextContainer>
        <QrCode value={whatsappLink} className="w-60 h-60 mt-2" />
      </div>

      <ButtonNavContainer leftButton={backButton} />
    </>
  );
};
