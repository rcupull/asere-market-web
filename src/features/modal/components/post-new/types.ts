import { SubmitPortal } from 'hooks/useSubmitPortal';

import { OnAfterSuccess } from 'types/api';
import { Post } from 'types/post';

export interface PostNewFormProps {
  submitPortal: SubmitPortal;
  routeName: string;
  onAfterSuccess?: OnAfterSuccess;
  post?: Post | null;
}
