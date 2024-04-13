import { useUpdateOneUserBusiness } from 'features/api/useUpdateOneUserBusiness';

import { FetchOptions } from 'hooks/useFetch';

import { FetchStatus } from 'types/api';
import { Business, PostsLayoutSection } from 'types/business';
import { getLayoutsFromBusiness, getSectionFromBusiness } from 'utils/business';
import { removeRow, set } from 'utils/general';

export type PostsLayoutSectionPayload = Pick<
  PostsLayoutSection,
  | 'name'
  | 'postCardLayout'
  | 'postCategoriesTags'
  | 'searchLayout'
  | 'hiddenName'
  | 'showIn'
  | 'type'
>;

export const useBusinessOwnerUpdate = (
  business: Business | undefined | null,
): {
  status: FetchStatus;
  addPostsLayoutSection: (
    args: { value: PostsLayoutSectionPayload },
    options?: FetchOptions,
  ) => void;
  updatePostsLayoutSection: (
    args: { value: PostsLayoutSectionPayload; sectionId: string },
    options?: FetchOptions,
  ) => void;
  removePostsLayoutSection: (args: { sectionId: string }, options?: FetchOptions) => void;
  showHidePostsLayoutSection: (
    args: { sectionId: string; hidden: boolean },
    options?: FetchOptions,
  ) => void;
} => {
  const { updateOneUserBusiness } = useUpdateOneUserBusiness();

  return {
    addPostsLayoutSection: ({ value }, options) => {
      if (!business) return;
      const { routeName } = business;

      const layouts = getLayoutsFromBusiness(business);
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
    updatePostsLayoutSection: ({ sectionId, value }, options) => {
      if (!business) return;
      const { routeName } = business;

      const sectionData = getSectionFromBusiness({ sectionId, business });
      if (!sectionData) return;

      const { index, section } = sectionData;

      const layouts = getLayoutsFromBusiness(business);
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
    showHidePostsLayoutSection: ({ sectionId, hidden }, options) => {
      if (!business) return;
      const { routeName } = business;

      const sectionData = getSectionFromBusiness({ sectionId, business });

      if (!sectionData) return;

      const { index, section } = sectionData;

      const layouts = getLayoutsFromBusiness(business);
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
    removePostsLayoutSection: ({ sectionId }, options) => {
      if (!business) return;
      const { routeName } = business;

      const sectionData = getSectionFromBusiness({ sectionId, business });
      if (!sectionData) return;

      const { index } = sectionData;

      const layouts = getLayoutsFromBusiness(business);
      const sections = business.layouts?.posts?.sections || [];

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
