import type { BusinessNewProps } from './components/business-new';
import type { CatalogsSearchImageProps } from './components/catalogs-search-image';
import type { ConfirmationProps } from './components/confirmation';
import type { EmergentProps } from './components/emergent';
import type { PostNewProps } from './components/post-new';
import type { PostsSectionNewProps } from './components/posts-section-new';
import type { ProfileUpdateProps } from './components/profile-update';
import type { UpdateBusinessAboutUsProps } from './components/update-business-about-us';
import type { UpdateBusinessBannerProps } from './components/update-business-banner';
import type { UpdateBusinessLogoProps } from './components/update-business-logo';
import type { UpdatePostCategoriesProps } from './components/update-post-categories';
import type { UpdateUserPlanProps } from './components/update-user-plan';

export type ModalId =
  | 'PostNew'
  | 'BusinessNew'
  | 'Confirmation'
  | 'ProfileUpdate'
  | 'UpdatePostCategories'
  | 'UpdateBusinessLogo'
  | 'UpdateBusinessBanner'
  | 'UpdateUserPlan'
  | 'UpdateBusinessAboutUs'
  | 'CatalogsSearchImage'
  | 'PostsSectionNew'
  | 'Emergent';

export type ModalWindowProps<Id extends ModalId> = Id extends 'PostNew'
  ? PostNewProps
  : Id extends 'BusinessNew'
    ? BusinessNewProps
    : Id extends 'Confirmation'
      ? ConfirmationProps
      : Id extends 'ProfileUpdate'
        ? ProfileUpdateProps
        : Id extends 'UpdatePostCategories'
          ? UpdatePostCategoriesProps
          : Id extends 'UpdateBusinessLogo'
            ? UpdateBusinessLogoProps
            : Id extends 'UpdateBusinessBanner'
              ? UpdateBusinessBannerProps
              : Id extends 'UpdateUserPlan'
                ? UpdateUserPlanProps
                : Id extends 'UpdateBusinessAboutUs'
                  ? UpdateBusinessAboutUsProps
                  : Id extends 'CatalogsSearchImage'
                    ? CatalogsSearchImageProps
                    : Id extends 'PostsSectionNew'
                      ? PostsSectionNewProps
                      : Id extends 'Emergent'
                        ? EmergentProps
                        : undefined;

export interface ModalWindowOptions {
  timeout?: number;
  emergent?: boolean;
}
