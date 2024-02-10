import { StyleProps } from 'types/general';
import { PostColor } from 'types/post';

export interface ProductColorsProps extends StyleProps {
  title?: string;
  items?: Array<PostColor>;
  value?: PostColor;
  onChange?: (value: PostColor) => void;
}
