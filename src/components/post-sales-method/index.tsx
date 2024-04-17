import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { ButtonClose } from 'components/button-close';
import { HtmlTextContainer } from 'components/html-text-container';
import { IconButton } from 'components/icon-button';
import { QrCode } from 'components/qr-code';

import { useAddOnePostToCart } from 'features/api/user/useAddOnePostToCart';
import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { queryToSearch } from 'hooks/useRouter/utils';

import { PostLayoutSalesMethod } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { getPostRoute } from 'utils/business';

const getWhatsAppLink = (phoneNumber: string, post: Post) => {
  const { name, routeName, _id } = post;

  const postRoute = getPostRoute({ routeName, postId: _id });

  const postUrl = `${window.location.origin}${postRoute}`;

  const search = queryToSearch({
    text: `Le escribo referente al producto *${name}* con link de referencia ${postUrl}`,
  });

  return `https://wa.me/${phoneNumber}?${search}`;
};

export interface PostSalesMethodProps extends StyleProps {
  post: Post;
  layout?: PostLayoutSalesMethod;
  whatsAppPhoneNumber?: string;
}

export const PostSalesMethod = ({
  layout,
  whatsAppPhoneNumber,
  post,
  className,
}: PostSalesMethodProps) => {
  const { pushModal } = useModal();
  const { addOnePostToCart } = useAddOnePostToCart();
  const { onRefreshAuthUser } = useAuth();

  if (layout === 'whatsApp_xsLink_lgQR') {
    if (!whatsAppPhoneNumber) {
      return <></>;
    }

    const whatsappLink = getWhatsAppLink(whatsAppPhoneNumber, post);

    return (
      <div className={className}>
        <QrCode
          className="w-8 h-8 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            pushModal(
              'Emergent',
              {
                useProps: () => {
                  return {
                    content: (
                      <div className="flex flex-col items-center px-20">
                        <HtmlTextContainer className="w-80">
                          <a href={whatsappLink} target="_blank" rel="noreferrer">
                            Click en este link
                          </a>{' '}
                          o use el código desde su teléfono para contactar con nosotros
                        </HtmlTextContainer>
                        <QrCode value={whatsappLink} className="w-60 h-60 mt-2" />
                      </div>
                    ),
                    title: 'WhatsApp',
                    className: '!w-fit',
                    customBtn: <ButtonClose className="ml-auto" />,
                  };
                },
              },
              { emergent: true },
            );
          }}
          value="some dummy data"
        />
      </div>
    );
  }

  if (layout === 'salesCart') {
    return (
      <IconButton
        title="Adicionar el carrito"
        svg={() => <ShoppingCartIcon className="size-8" />}
        isBusy={addOnePostToCart.status.isBusy}
        onClick={(e) => {
          e.preventDefault();
          addOnePostToCart.fetch(
            { postId: post._id },
            {
              onAfterSuccess: () => {
                onRefreshAuthUser();
              },
            },
          );
        }}
        className={className}
      />
    );
  }

  return <></>;
};
