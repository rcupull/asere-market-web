import { PostsSection } from './components/posts-section';

import { Business, PostsLayoutSection, PostsLayoutSectionVisibility } from 'types/business';
import { StyleProps } from 'types/general';

export interface PostsSectionsViewProps extends StyleProps {
  layouts: Array<PostsLayoutSection>;
  visibility: PostsLayoutSectionVisibility;
  //
  business: Business;
  onRefresh: () => void;
}

export const PostsSectionsView = ({
  business,
  onRefresh,
  layouts,
  visibility,
}: PostsSectionsViewProps) => {
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
            visibility={visibility}
          />
        );
      })}
    </div>
  );
};
