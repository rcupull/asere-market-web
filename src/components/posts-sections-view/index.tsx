
import { PostsSection } from './components/posts-section';

import { Business, PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';

export interface PostsSectionsViewProps extends StyleProps {
  layouts: Array<PostsLayoutSection>;
  //
  business: Business;
  onRefresh: () => void;
}

export const PostsSectionsView = ({ business, onRefresh, layouts }: PostsSectionsViewProps) => {
  return (
    <div className="flex flex-col">
      {layouts?.map((layout, index) => {
        return (
          <PostsSection
            key={index}
            index={index}
            business={business}
            onRefresh={onRefresh}
            layout={layout}
          />
        );
      })}
    </div>
  );
};
