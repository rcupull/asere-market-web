import { useGetAllUserBusiness } from 'features/api/useGetAlluserBusiness';
import { useApiPersistentPaginated } from 'features/slices/useApiPersistentPaginated';

export const useAllUserBusiness = (): ReturnType<typeof useGetAllUserBusiness> => {
  const { getAllUserBussiness } = useGetAllUserBusiness();

  return {
    getAllUserBussiness: useApiPersistentPaginated('useAllUserBusiness', getAllUserBussiness),
  };
};
