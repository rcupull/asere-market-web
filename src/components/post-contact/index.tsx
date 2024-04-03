import { Link } from 'react-router-dom';

import { ButtonClose } from 'components/button-close';
import SvgWhatsapp from 'components/icons/Whatsapp';
import { QrCode } from 'components/qr-code';

import { useModal } from 'features/modal/useModal';

import { queryToSearch } from 'hooks/useRouter/utils';

import { PostLayoutContact } from 'types/business';
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

export interface PostContactProps extends StyleProps {
  post: Post;
  layout?: PostLayoutContact;
  whatsAppPhoneNumber?: string;
}

export const PostContact = ({ layout, whatsAppPhoneNumber, post, className }: PostContactProps) => {
  const { pushModal } = useModal();

  if (!whatsAppPhoneNumber) {
    return <></>;
  }

  const whatsappLink = getWhatsAppLink(whatsAppPhoneNumber, post);

  if (layout === 'whatsApp_xsLink_lgQR') {
    return (
      <div className={className}>
        <Link className="md:hidden" to={whatsappLink}>
          <SvgWhatsapp className="w-8 h-8 stroke-green-300" />
        </Link>
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

  return <></>;
};
