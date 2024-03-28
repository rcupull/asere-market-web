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
}

export const CardPost = ({ className, post, layout, href, callAfarResources }: CardPostProps) => {
  const { pushModal } = useModal();

  return (
    <UpdateSomethingContainer
      onClick={() => pushModal('PostNew', { postId: post._id, callAfarResources })}
    >
      <Link data-id="CardPost" className={cn('group', className)} to={href}>
        <CardPostImage layout={layout} post={post} />

        <div className="flex items-center justify-between">
          <div>
            <CardPostName layout={layout} post={post} />
            <CardPostPrice layout={layout} post={post} />
          </div>
        </div>
      </Link>
    </UpdateSomethingContainer>
  );
};
