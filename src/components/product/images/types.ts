import { StyleProps } from 'types/general';
import { PostImage } from 'types/post';

export interface ProductImagesProps extends StyleProps {
  value?: Array<PostImage>;
  getImageUrl?: (src: string) => string;
}
