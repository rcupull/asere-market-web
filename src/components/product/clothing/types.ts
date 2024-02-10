import { StyleProps } from 'types/general';
import { PostClothingSize } from 'types/post';

export interface ProductClothingSizeProps extends StyleProps {
  title?: string;
  items?: Array<PostClothingSize>;
  value?: PostClothingSize;
  onChange?: (value: PostClothingSize) => void;
}
