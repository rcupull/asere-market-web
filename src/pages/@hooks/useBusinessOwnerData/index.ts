import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { FetchStatus } from 'types/api';
import { Business, BusinessLayouts, PostsLayoutSection } from 'types/business';
import { deepJsonCopy, isNumber } from 'utils/general';

/**
 * Informacion relacionada con el negocio que se puede editar editando. Siempre estara debajo de un routename
 */
export const useBusinessOwnerData = (): {
  data: Business | null;
  status: FetchStatus;
  /**
   * Fetch the new data if the routename is diferent
   */
  onRefresh: (args: { routeName: string }) => void;
  /**
   * Always fetch the new data
   */
  onFetch: (args: { routeName: string }) => void;
  onGetPostsLayoutSection: (args: {
    sectionId: string;
  }) => { section: PostsLayoutSection; index: number } | undefined;
  onGetPostsLayoutSections: () => Array<PostsLayoutSection>;
  onGetLayouts: () => BusinessLayouts;
  onReset: () => void;
} => {
  const { getOneUserBusiness } = useGetOneUserBusiness();

  const { data, setData, reset } = useSimpleSlice<Business>('useBusinessOwnerData');

  return {
    onRefresh: ({ routeName }) => {
      if (data?.routeName === routeName) {
        return;
      }
      getOneUserBusiness.fetch({ routeName }, { onAfterSuccess: setData });
    },
    onFetch: ({ routeName }) => {
      getOneUserBusiness.fetch({ routeName }, { onAfterSuccess: setData });
    },
    onGetPostsLayoutSection: ({ sectionId }) => {
      const index = data.layouts?.posts?.sections.findIndex(({ _id }) => _id === sectionId);

      if (isNumber(index) && index >= 0) {
        const section = data.layouts?.posts?.sections[index];

        if (!section) return undefined;

        return {
          index,
          section,
        };
      }

      return undefined;
    },
    onGetPostsLayoutSections: () => {
      return data.layouts?.posts?.sections || [];
    },
    onGetLayouts: () => {
      return deepJsonCopy(data.layouts || {});
    },
    onReset: reset,
    status: getOneUserBusiness.status,
    data,
  };
};
