import { useModal } from 'features/modal/useModal';

import { ModalId } from './types';

import { dynamic, LoadableReturn } from 'utils/makeLazy';

const componentRecord: Record<ModalId, LoadableReturn> = {
  UpdateUserPlan: dynamic(() =>
    import('./components/update-user-plan').then((m) => ({
      default: m.UpdateUserPlan,
    })),
  ),
  Emergent: dynamic(() =>
    import('./components/emergent').then((m) => ({
      default: m.Emergent,
    })),
  ),
  PostsSectionNew: dynamic(() =>
    import('./components/posts-section-new').then((m) => ({
      default: m.PostsSectionNew,
    })),
  ),
  CatalogsSearchImage: dynamic(() =>
    import('./components/catalogs-search-image').then((m) => ({
      default: m.CatalogsSearchImage,
    })),
  ),
  PostNew: dynamic(() => import('./components/post-new').then((m) => ({ default: m.PostNew }))),
  UpdateBusinessLogo: dynamic(() =>
    import('./components/update-business-logo').then((m) => ({ default: m.UpdateBusinessLogo })),
  ),
  UpdatePostCategories: dynamic(() =>
    import('./components/update-post-categories').then((m) => ({
      default: m.UpdatePostCategories,
    })),
  ),
  BusinessNew: dynamic(() =>
    import('./components/business-new').then((m) => ({ default: m.BusinessNew })),
  ),
  Confirmation: dynamic(() =>
    import('./components/confirmation').then((m) => ({ default: m.Confirmation })),
  ),
  ProfileUpdate: dynamic(() =>
    import('./components/profile-update').then((m) => ({ default: m.ProfileUpdate })),
  ),
};

export const ModalContainer = (): JSX.Element | null => {
  const { allModalData } = useModal();

  return (
    <>
      {allModalData?.map(({ id, props }, index) => {
        const Component = componentRecord[id];
        return !!Component && <Component key={index} {...props} />;
      })}
    </>
  );
};
