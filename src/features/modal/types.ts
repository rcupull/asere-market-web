import { BusinessNewProps } from './components/business-new';
import { ConfirmationProps } from './components/confirmation';
import { PostNewProps } from './components/post-new';
import { ProfileUpdateProps } from './components/profile-update';
import { UpdateBusinessBannerProps } from './components/update-business-banner';
import { UpdateBusinessLogoProps } from './components/update-business-logo';
import { UpdatePostCategoriesProps } from './components/update-post-categories';
import { UpdateSocialNetworksProps } from './components/update-social-networks';

export type ModalId =
  | 'PostNew'
  | 'BusinessNew'
  | 'Confirmation'
  | 'ProfileUpdate'
  | 'UpdatePostCategories'
  | 'UpdateBusinessLogo'
  | 'UpdateBusinessBanner'
  | 'UpdateSocialNetworks';

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
              : Id extends 'UpdateSocialNetworks'
                ? UpdateSocialNetworksProps
                : undefined;

export interface ModalWindowOptions {
  timeout?: number;
  emergent?: boolean;
}
