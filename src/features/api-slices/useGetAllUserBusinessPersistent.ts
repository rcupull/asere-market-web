import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useApiPersistentPaginated } from 'features/slices/useApiPersistentPaginated';

export const useAllUserBusiness = (): ReturnType<typeof useGetAllUserBusiness> => {
  const { getAllUserBussiness } = useGetAllUserBusiness();

  return {
    getAllUserBussiness: useApiPersistentPaginated('useAllUserBusiness', getAllUserBussiness),
  };
};
