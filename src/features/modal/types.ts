import { BusinessNewProps } from './components/business-new';
import { ConfirmationProps } from './components/confirmation';
import { PostCategoriesProps } from './components/post-categories';
import { PostNewProps } from './components/post-new';
import { ProfileUpdateProps } from './components/profile-update';

export type ModalId =
  | 'PostNew'
  | 'BusinessNew'
  | 'Confirmation'
  | 'ProfileUpdate'
  | 'PostCategories';

export type ModalWindowProps<Id extends ModalId> = Id extends 'PostNew'
  ? PostNewProps
  : Id extends 'BusinessNew'
    ? BusinessNewProps
    : Id extends 'Confirmation'
      ? ConfirmationProps
      : Id extends 'ProfileUpdate'
        ? ProfileUpdateProps
        : Id extends 'PostCategories'
          ? PostCategoriesProps
          : undefined;

export interface ModalWindowOptions {
  timeout?: number;
  emergent?: boolean;
}
