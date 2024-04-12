import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { ButtonClose } from 'components/button-close';
import { IconButton } from 'components/icon-button';
import SvgWhatsapp from 'components/icons/Whatsapp';
import { QrCode } from 'components/qr-code';

import { useAddOnePostToCar } from 'features/api/useAddOnePostToCar';
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
  const { addOnePostToCar } = useAddOnePostToCar();

  if (layout === 'whatsApp_xsLink_lgQR') {

    if (!whatsAppPhoneNumber) {
      return <></>;
    }

    const whatsappLink = getWhatsAppLink(whatsAppPhoneNumber, post);

    return (
      <div className={className}>
        <div className="md:hidden" onClick={() => window.open(whatsappLink, '_blank')}>
          <SvgWhatsapp className="w-8 h-8 stroke-green-300" />
        </div>
        <QrCode
          className="hidden md:block w-8 h-8 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            pushModal(
              'Confirmation',
              {
                useProps: () => {
                  return {
                    content: (
                      <div className="flex justify-center px-20">
                        <QrCode value={whatsappLink} className="w-60 h-60" />
                      </div>
                    ),
                    title: 'Contácteme por WhatsApp',
                    primaryBtn: undefined,
                    secondaryBtn: undefined,
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
        isBusy={addOnePostToCar.status.isBusy}
        onClick={(e) => {
          e.preventDefault();
          addOnePostToCar.fetch({ postId: post._id });
        }}
        className={className}
      />
    );
  }

  return <></>;
};
