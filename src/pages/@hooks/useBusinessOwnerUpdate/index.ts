import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';

import { FetchOptions } from 'hooks/useFetch';

import { useBusinessOwnerData } from '../useBusinessOwnerData';

import { FetchStatus } from 'types/api';
import { PostsLayoutSection } from 'types/business';
import { deepJsonCopy, removeRow, set } from 'utils/general';

export type PostsLayoutSectionPayload = Pick<
  PostsLayoutSection,
  'name' | 'postCardLayout' | 'postCategoriesTags' | 'searchLayout' | 'hiddenName' | 'hidden'
>;

export const useBusinessOwnerUpdate = (): {
  status: FetchStatus;
  addPostsLayoutSection: (
    args: { routeName: string; value: PostsLayoutSectionPayload },
    options?: FetchOptions,
  ) => void;
  updatePostsLayoutSection: (
    args: { routeName: string; value: PostsLayoutSectionPayload; sectionId: string },
    options?: FetchOptions,
  ) => void;
  removePostsLayoutSection: (
    args: { routeName: string; sectionId: string },
    options?: FetchOptions,
  ) => void;
  showHidePostsLayoutSection: (
    args: { routeName: string; sectionId: string; hidden: boolean },
    options?: FetchOptions,
  ) => void;
} => {
  const { updateOneUserBusiness } = useUpdateOneUserBusiness();

  const businessOwnerData = useBusinessOwnerData();

  return {
    addPostsLayoutSection: ({ routeName, value }, options) => {
      const layouts = deepJsonCopy(businessOwnerData.data?.layouts || {});
      const sectionCount = layouts.posts?.sections.length || 0;

      set(layouts, `posts.sections.${sectionCount}`, value);

      updateOneUserBusiness.fetch(
        {
          routeName,
          update: {
            layouts,
          },
        },
        options,
      );
    },
    updatePostsLayoutSection: ({ routeName, sectionId, value }, options) => {
      const sectionData = businessOwnerData.onGetPostsLayoutSection({ sectionId });
      if (!sectionData) return;

      const { index, section } = sectionData;

      const layouts = businessOwnerData.onGetLayouts();

      set(layouts, `posts.sections.${index}`, {
        ...section,
        ...value,
      });

      updateOneUserBusiness.fetch(
        {
          routeName,
          update: {
            layouts,
          },
        },
        options,
      );
    },
    showHidePostsLayoutSection: ({ routeName, sectionId, hidden }, options) => {
      const sectionData = businessOwnerData.onGetPostsLayoutSection({ sectionId });
      if (!sectionData) return;

      const { index, section } = sectionData;

      const layouts = businessOwnerData.onGetLayouts();

      set(layouts, `posts.sections.${index}`, { ...section, hidden });

      updateOneUserBusiness.fetch(
        {
          routeName,
          update: {
            layouts,
          },
        },
        options,
      );
    },
    removePostsLayoutSection: ({ routeName, sectionId }, options) => {
      const sectionData = businessOwnerData.onGetPostsLayoutSection({ sectionId });
      if (!sectionData) return;

      const { index } = sectionData;

      const layouts = businessOwnerData.onGetLayouts();
      const sections = businessOwnerData.onGetPostsLayoutSections();

      set(layouts, `posts.sections`, removeRow(sections, index));

      updateOneUserBusiness.fetch(
        {
          routeName,
          update: {
            layouts,
          },
        },
        options,
      );
    },
    status: updateOneUserBusiness.status,
  };
};
