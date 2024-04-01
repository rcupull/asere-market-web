import { Link } from 'react-router-dom';

import { useModal } from 'features/modal/useModal';

import { CallAfarResources } from 'hooks/useCallFromAfar';

import { CardPostImage } from './CardPostImage';
import { CardPostName } from './CardPostName';
import { CardPostPrice } from './CardPostPrice';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { PostCardLayout } from 'types/business';
import { Post } from 'types/post';
import { cn } from 'utils/general';

export interface CardPostProps {
  className?: string;
  post: Post;
  layout?: PostCardLayout;
  href: string;
  callAfarResources?: CallAfarResources;
  neverUpdate?: boolean;
}

export const CardPost = ({
  className,
  neverUpdate,
  post,
  layout,
  href,
  callAfarResources,
}: CardPostProps) => {
  const { pushModal } = useModal();
  const { size } = layout || {};

  const content = (
    <Link data-id="CardPost" className={cn('group', className)} to={href}>
      <div
        className={cn('flex flex-col p-1 w-[90vw] overflow-hidden', {
          'sm:w-52 h-60': size === 'small',
          'sm:w-72 h-80': size === 'medium',
          'sm:w-80 h-96': size === 'long',
        })}
      >
        <CardPostImage layout={layout} post={post} className="flex-grow" />

        <div className="flex items-center justify-between flex-shrink-0 mt-auto">
          <div>
            <CardPostName layout={layout} post={post} />
            <CardPostPrice layout={layout} post={post} />
          </div>
        </div>
      </div>
    </Link>
  );

  if (neverUpdate) {
    return content;
  }

  return (
    <UpdateSomethingContainer
      onClick={() => pushModal('PostNew', { postId: post._id, callAfarResources })}
    >
      {content}
    </UpdateSomethingContainer>
  );
};
